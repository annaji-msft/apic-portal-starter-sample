import {useEffect, useRef, useState} from "react"
import {useNavigate, useSearchParams} from "react-router-dom"
import {Input, Spinner} from "@fluentui/react-components"
import {
    Cloud16Regular,
    Dismiss12Regular,
    Dismiss16Regular,
    Search16Regular,
    Search24Regular,
} from "@fluentui/react-icons"
import {LocalStorageKey, useLocalStorage} from "../../../components/useLocalStorage.tsx"
import {useFetchData} from "../../../components/fetchData.tsx"
import {TApi} from "../../../types.ts"

import colors from "../../../colors.module.scss"
import c from "./index.module.scss"


export type TSearchRecent = {type: "api" | "string"; key: string; value: string; api?: TApi}

let timeoutId: any;

const Search = () => {
    const localStorage = useLocalStorage(LocalStorageKey.searchRecents)
    const accessToken = useLocalStorage(LocalStorageKey.accessToken).get()
    const fetchData = useFetchData()
    const navigate = useNavigate()
    const ref = useRef<HTMLDivElement>(null)

    const [inputValue, setInputValue] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [recents, setRecents] = useState<TSearchRecent[]>(JSON.parse(localStorage.get() ?? "[]"))
    const [searchResults, setSearchResults] = useState<TApi[]>([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        localStorage.set(JSON.stringify(recents))
    }, [localStorage, recents, accessToken])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])

    const handleClickOutside = ({target}: MouseEvent) => {
        if (ref.current && !ref.current.contains(target as Node)) {
            setIsFocused(false)
        }
    }

    const submit = (search: string) => {
        if (search && accessToken) {
            fetchData("apis?$search=" + search)
                .then(searchResults => {
                    setSearchResults(searchResults.value)
                })
                .finally(() => setIsLoading(false))
        } else {
            setSearchResults([])
        }
    }

    const addToRecents = (type: "api" | "string", value: string, api?: TApi) => {
        const key = type + "." + value
        if (!recents.find(recent => recent.key === key)) {
            if (type === "api") {
                setRecents([...recents, {type: "api", key, value, api}])
            } else {
                setRecents([{type: "string", key, value}, ...recents])
            }
        }
    }

    const removeFromRecents = (remove: string) => {
        setRecents(prev => prev.filter(e => e.key !== remove))
    }

    return (
        <div className={c.searchContainer} ref={ref}>
            <Input
                className={c.input}
                size={"large"}
                contentBefore={<Search24Regular style={{color: colors.blueLight}} />}
                contentAfter={
                    inputValue ? (
                        <Dismiss16Regular
                            onClick={() => {
                                setInputValue("")
                                setSearchResults([])
                                searchParams.delete("search")
                                setSearchParams(searchParams)
                            }}
                        />
                    ) : (
                        ""
                    )
                }
                placeholder={"Search for an API"}
                value={inputValue}
                onChange={e => {
                    const value = e.target.value
                    if (timeoutId != null) clearTimeout(timeoutId)
                    setIsLoading(true)
                    timeoutId = setTimeout(() => submit(value), 500)
                    setInputValue(value)
                }}
                onFocus={() => {
                    if (inputValue) {
                        setIsLoading(true)
                        submit(inputValue)
                    }
                    setIsFocused(true)
                }}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        addToRecents("string", inputValue)
                        searchParams.set("search", inputValue)
                        setSearchParams(searchParams)
                        setIsFocused(false)
                    }
                }}
            />
            {isFocused &&
                (inputValue !== "" ? (
                    !!searchResults.length ? (
                        <div className={c.popup}>
                            <div className={c.header}>
                                <h6>Suggestions</h6>
                            </div>
                            {searchResults.map(api => (
                                <div key={api.name} className={c.record}>
                                    <button
                                        className={c.recordSelect}
                                        onClick={() => {
                                            setIsFocused(false)
                                            addToRecents("api", api.name, api)
                                            navigate("detail/" + api.name + window.location.search)
                                        }}
                                    >
                                        <Cloud16Regular />
                                        <span className={c.apiName}>{api.name}</span>
                                        <span className={c.apiMeta}>
                                            {api.kind}; {api.lifecycleStage}; {api.summary}
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={c.popup}>
                            {isLoading ? (
                                <Spinner size="small" className={c.noResults} />
                            ) : (
                                <div className={c.noResults}>
                                    Can't find any search results. Try a different search term.
                                </div>
                            )}
                        </div>
                    )
                ) : (
                    !!recents.length && (
                        <div className={c.popup}>
                            <div className={c.header}>
                                <h6>Recents</h6>
                                <button
                                    onClick={() => {
                                        localStorage.remove()
                                        setRecents([])
                                    }}
                                >
                                    Clear
                                </button>
                            </div>
                            {recents.map(recent => (
                                <div key={recent.key} className={c.record}>
                                    <button
                                        className={c.recordSelect}
                                        onClick={() => {
                                            setIsFocused(false)
                                            if (recent.type === "api") {
                                                navigate("detail/" + recent.value + window.location.search)
                                            } else {
                                                setInputValue(recent.value)
                                                searchParams.append("search", recent.value)
                                                setSearchParams(searchParams)
                                            }
                                        }}
                                    >
                                        {recent.type === "api" ? <Cloud16Regular /> : <Search16Regular />}
                                        <span className={c.apiName}>{recent.value}</span>
                                        {recent.type === "api" && recent.api && (
                                            <span className={c.apiMeta}>
                                                {recent.api.kind}; {recent.api.lifecycleStage}; {recent.api.summary}
                                            </span>
                                        )}
                                    </button>
                                    <button className={c.recordDelete} onClick={() => removeFromRecents(recent.key)}>
                                        <Dismiss12Regular />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )
                ))}
        </div>
    )
}

export default Search
