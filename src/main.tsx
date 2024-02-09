import React from "react"
import ReactDOM from "react-dom/client"
import {FluentProvider, webLightTheme} from "@fluentui/react-components"

import {LocalStorageProvider} from "./components/useLocalStorage.tsx"
import Router from "./Router.tsx"

import "./index.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <FluentProvider theme={webLightTheme} className="content-wrapper" style={{height: "100%"}}>
            <LocalStorageProvider>
                <Router />
            </LocalStorageProvider>
        </FluentProvider>
    </React.StrictMode>
)
