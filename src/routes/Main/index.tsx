import {Outlet} from "react-router-dom"

import ApisList from "./ApisList"
import Heading from "./Heading"

const Main = () => {
    return (
        <>
            <Outlet />

            <main>
                <Heading />
                <ApisList />
            </main>
        </>
    )
}

export default Main
