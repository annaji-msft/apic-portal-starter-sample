import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {Spinner} from "@fluentui/react-components"
import {LocalStorageKey, useLocalStorage} from "../../../components/useLocalStorage.tsx"
import useFilters, {TFilterTag} from "./Filters/useFilters.ts"
import {useFetchData} from "../../../components/fetchData.tsx"
import RestrictedAccessModal from "../../../components/RestrictedAccessModal/index.tsx"
import {TApi} from "../../../types.ts"
import {TLayout} from "./LayoutSwitch.tsx"
import ApisCards from "./ApisCards"
import ApisTable from "./ApisTable"
import Filters from "./Filters"
import FiltersActive from "./FiltersActive.tsx"
import FirstRow from "./FirstRow.tsx"

import c from "./index.module.scss"
import NoApis from "../../../components/logos/NoApis.tsx"

const groupByKey = <T extends Record<string, any>>(list: T[], key: keyof T) =>
    list.reduce((hash, obj) => ({...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj)}), {} as Record<string, T[]>)

const sortApis = (apis: TApi[], sortBy?: string) => {
    if (sortBy) {
        const sortingOption = sortBy.split(".")
        const key = sortingOption[0]
        const order = sortingOption[1]

        if (order === "asc") {
            return [...apis].sort((a, b) => (a[key] > b[key] ? 1 : -1))
        } else {
            return [...apis].sort((a, b) => (a[key] < b[key] ? 1 : -1))
        }
    }

    return apis
}

const ApisList = () => {
    const bearer = useLocalStorage(LocalStorageKey.accessToken).get()
    const layout = useLocalStorage(LocalStorageKey.apiListLayout).get()
    const sortBy = useLocalStorage(LocalStorageKey.apiListSortBy).get()
    const isRestricted = useLocalStorage(LocalStorageKey.isResctricted).get()
    const fetchData = useFetchData()

    const [filters] = useFilters()
    const [apis, setApis] = useState<TApi[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showRestrictedModal, setShowRestrictedModal] = useState<boolean>(false)

    const [searchParams] = useSearchParams()
    const search = searchParams.get("search")

    useEffect(() => {
        setShowRestrictedModal(isRestricted === "true")
    }, [isRestricted])

    useEffect(() => {
        setIsLoading(true)
        let searchQuery = ""
        let filterQuery = ""

        if (search) {
            searchQuery = "$search=" + search
        }

        if (filters.length > 0) {
            filterQuery = "$filter="
            const groupedParams = groupByKey(filters, "filterTypeKey")
            const groupedParamsArray = Object.entries(groupedParams)
            groupedParamsArray.forEach(([key, paramGroup], index) => {
                filterQuery += "("
                paramGroup.forEach((param: TFilterTag, paramIndex: number) => {
                    filterQuery += param.filterQuery

                    if (paramIndex !== paramGroup.length - 1) {
                        filterQuery += " or "
                    }
                })
                filterQuery += ")"

                if (index !== groupedParamsArray.length - 1) {
                    filterQuery += " and "
                }
            })
        }

        if (filterQuery !== "" || searchQuery !== "") {
            const queryString = []
            if (!!filterQuery) queryString.push(filterQuery)
            if (!!searchQuery) queryString.push(searchQuery)

            if (bearer) {
                fetchData("apis?" + queryString.join("&"))
                    .then(apis => {
                        setApis(sortApis(apis?.value, sortBy))
                    })
                    .finally(() => setIsLoading(false))
            }
        } else {
            if (bearer) {
                fetchData("apis")
                    .then(apis => {
                        setApis(sortApis(apis?.value, sortBy))
                    })
                    .finally(() => setIsLoading(false))
            }
        }
    }, [bearer, filters, search, sortBy])

    return (
        <section className={c.apisList}>
            {showRestrictedModal && <RestrictedAccessModal />}
            <Filters />

            <div className={c.main}>
                <FirstRow apis={apis} />

                <FiltersActive />

                {!bearer ? (
                    <div className={c.emptyState}>Sign in or create an account to view APIs.</div>
                ) : isLoading ? (
                    <Spinner size="small" />
                ) : apis?.length === 0 ? (
                    <div className={c.emptyState}>
                        <NoApis />
                        <div>Can't find any search results. Try a different search term.</div>
                    </div>
                ) : layout === TLayout.table ? (
                    <ApisTable apis={apis} />
                ) : (
                    <ApisCards apis={apis} />
                )}
            </div>
        </section>
    )
}

export default ApisList
