import {FC, useEffect} from "react"
import {Dropdown, Option, Tab} from "@fluentui/react-components"
import {LocalStorageKey, useLocalStorage} from "../../../components/useLocalStorage.tsx"
import {SortingOptions, TableColumns} from "../../../constants.tsx"
import {TApi, TOption} from "../../../types.ts"
import LayoutSwitch from "./LayoutSwitch.tsx"

import c from "./index.module.scss"

const FirstRowPure: FC<{count: number; sortBy?: string; setSortBy: (sortBy: string) => void}> = ({
    count,
    sortBy,
    setSortBy,
}) => (
    <div className={c.firstRow}>
        {count === 0 ? (
            <p>
                Displaying <b>0</b> items
            </p>
        ) : (
            <p>
                Displaying <b>1</b> to <b>{count}</b> of <b>{count}</b> items
            </p>
        )}

        <div className={c.controls}>
            <div className={c.sortBy}>
                <label htmlFor={"sortBy"}>Sort by</label>
                <Dropdown
                    id={"sortBy"}
                    value={sortBy ? SortingOptions.find(o => o.value === sortBy)?.label : ""}
                    selectedOptions={sortBy ? [sortBy] : []}
                    onOptionSelect={(_, {optionValue}) => setSortBy(optionValue)}
                >
                    {SortingOptions.map(option => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Dropdown>
            </div>

            <LayoutSwitch />
        </div>
    </div>
)

const FirstRow: FC<{apis: TApi[] | null}> = ({apis}) => {
    const localStorageSortBy = useLocalStorage(LocalStorageKey.apiListSortBy)
    const sortBy = localStorageSortBy.get()
    const apisCount = apis?.length ?? 0

    useEffect(() => {
        if (!sortBy) localStorageSortBy.set(TableColumns[0].value)
    }, [])

    return <FirstRowPure count={apisCount} sortBy={sortBy} setSortBy={localStorageSortBy.set} />
}

export default FirstRow
