import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from "react"

import {TLayout} from "../routes/Main/ApisList/LayoutSwitch.tsx"

const KEY_PREFIX = "MS_APIC_DEVPORTAL_"

export enum LocalStorageKey {
    apiListLayout = "apiListLayout",
    apiListSortBy = "apiListSortBy",
    searchRecents = "searchRecents",
    accessToken = "accessToken",
    dataApiEndpoint = "dataApiEndpoint",
    isResctricted = "isResctricted",
}

type TLocalStorageValuesMap = {
    [LocalStorageKey.apiListLayout]: TLayout
    [LocalStorageKey.apiListSortBy]?: string
    [LocalStorageKey.searchRecents]: string
    [LocalStorageKey.accessToken]: string
    [LocalStorageKey.dataApiEndpoint]: string
    [LocalStorageKey.isResctricted]: string
}

const LocalStorageContext = createContext<{iterator?: number; update?: Dispatch<SetStateAction<number>>}>({iterator: 0})

export const LocalStorageProvider: FC<{children: ReactNode}> = ({children}) => {
    const [iterator, setIterator] = useState(0)

    return (
        <LocalStorageContext.Provider value={{update: setIterator, iterator}}>{children}</LocalStorageContext.Provider>
    )
}

export const useLocalStorage = <T extends LocalStorageKey>(keyParam: T) => {
    const {update} = useContext(LocalStorageContext)

    const key = KEY_PREFIX + keyParam

    const get = () => window.localStorage.getItem(key) as TLocalStorageValuesMap[T] | undefined
    const remove = () => window.localStorage.removeItem(key)
    const set = (value: TLocalStorageValuesMap[T]) => {
        if (value == get()) return

        if (value == null) remove()
        else window.localStorage.setItem(key, value)

        update?.(old => old + 1) // needed to trigger rerender of all "get" subscriptions
    }

    return {
        get,
        set,
        remove,
        keys: () =>
            Object.keys(window.localStorage)
                .map(key => key.split(KEY_PREFIX))
                .filter(e => !e[0] && e[1])
                .map(e => e[1]),
    }
}
