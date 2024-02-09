import Search from "./Search.tsx"

import c from "./index.module.scss"

import {useEffect, useState} from "react"
import {TConfig} from "../../../types.ts"

const Heading = () => {
    const [config, setConfig] = useState<TConfig>()

    const fetchConfig = async () => {
        const response = await fetch(window.location.href + "config")

        const dataJson = await response.json()
        setConfig(dataJson)
    }

    useEffect(() => {
        fetchConfig()
    }, [])

    return (
        <section className={c.heading}>
            <h1>API Center portal</h1>
            <Search />
        </section>
    )
}

export default Heading
