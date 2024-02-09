import {useCallback} from "react"
import {LocalStorageKey, useLocalStorage} from "./useLocalStorage"

export enum Method {
    GET = "GET",
    POST = "POST",
}

export const useFetchData = () => {
    const bearer = useLocalStorage(LocalStorageKey.accessToken).get()
    const baseUrl = useLocalStorage(LocalStorageKey.dataApiEndpoint).get()

    return useCallback(
        (requestString: string, method?: Method) => fetchData(`https://${baseUrl}/` + requestString, method, bearer),
        [bearer, baseUrl]
    )
}

export const fetchData = async (url: string, method: Method = Method.GET, bearer?: string) => {
    let headers: HeadersInit = {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
    if (bearer) {
        headers.Authorization = "Bearer " + bearer
    }

    const response = await fetch(url, {
        method,
        headers,
    })

    if (response.status === 401 || response.status == 403) {
        localStorage.setItem("MS_APIC_DEVPORTAL_isResctricted", "true") //TODO: add something meaningful
        return
    } else if (!response.ok) {
        alert("Something went wrong")
        return
    }

    const dataJson = await response.json()

    return dataJson
}
