import {FC} from "react"
import {Dismiss12Regular} from "@fluentui/react-icons"
import useFilters, {TFilterTag} from "./Filters/useFilters.ts"

import c from "./index.module.scss"

const FilterTag: FC<{item: TFilterTag; onClick: () => void}> = ({item, onClick}) => (
    <div className={c.filterTag}>
        {item.filterType}: <b>{item.label}</b>
        <button title={"Remove"} onClick={onClick}>
            <Dismiss12Regular />
        </button>
    </div>
)

const FiltersActive = () => {
    const [filtersActive, setSearchParams] = useFilters()

    return filtersActive.length === 0 ? (
        <></>
    ) : (
        <div className={c.filtersActive}>
            {filtersActive.map(item => (
                <FilterTag
                    key={item.key}
                    item={item}
                    onClick={() =>
                        setSearchParams(prev => {
                            prev.delete(item.key)
                            return prev
                        })
                    }
                />
            ))}
            <button onClick={() => setSearchParams()} className={c.filtersClearAll}>
                Clear all
            </button>
        </div>
    )
}

export default FiltersActive
