import {FC, useEffect} from "react"
import {
    Body1,
    Body1Strong,
    Button,
    Caption1,
    Divider,
    Link
} from "@fluentui/react-components"
import {useNavigate} from "react-router-dom"
import { MessageBar } from "@fluentui/react"
import {ArrowDownloadRegular, CopyRegular, Document20Regular, Link20Regular, OpenRegular} from "@fluentui/react-icons"
import {LocalStorageKey, useLocalStorage} from "../../../components/useLocalStorage"
import VsCodeLogo from "../../../components/logos/VsCodeLogo"
import StoplightLogo from "../../../components/logos/StoplightLogo"
import {TApi} from "../../../types"

import c from "./index.module.scss"

const Options: FC<{api: TApi; version?: string; definition?: string}> = ({api, version, definition}) => {
    const navigate = useNavigate()
    const bearer = useLocalStorage(LocalStorageKey.accessToken).get()
    const dataApiEndpoint = useLocalStorage(LocalStorageKey.dataApiEndpoint).get()

    const downloadApiDefinition = async () => {
        const response = await fetch(
            `https://${dataApiEndpoint}/apis/${api.name}/versions/${version}/definitions/${definition}:exportSpecification`,
            {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + bearer,
                },
            }
        )

        if (response.status === 200) {
            const responseJson = await response.json()
            if (responseJson?.format === "inline") {
                const fileName = "api_definition.json"
                const data = new Blob([responseJson.value], {type: "text/json"})
                const jsonURL = window.URL.createObjectURL(data)
                const link = document.createElement("a")
                document.body.appendChild(link)
                link.href = jsonURL
                link.setAttribute("download", fileName)
                link.click()
                document.body.removeChild(link)
            }

            return
        } else {
            alert("Something went wrong, please reload the page")
        }
    }

    return (
        <div className={c.options}>
            {!version || !definition ? (
                <MessageBar>
                   There are no available options for this API.
                </MessageBar>
            ) : (
                <div className={c.option}>
                    <div>
                        <Document20Regular />
                    </div>
                    <div className={c.optionInfo}>
                        <div className={c.title}>
                            <Body1Strong>API Definition</Body1Strong>
                            <Link className={c.link} onClick={() => downloadApiDefinition()}>
                                <Caption1>Download</Caption1> <ArrowDownloadRegular />
                            </Link>
                        </div>
                        <Body1 className={c.description}>
                            This file defines how to use the API, including the endpoints, policies, authentication, and
                            responses.
                        </Body1>
                        {/* <Button icon={<VsCodeLogo />} className={c.button}>
                            Open in Visual Studio Code
                        </Button> */
                        <Button icon={<StoplightLogo />} className={c.button} onClick={() => navigate("/desc/" + api.name + window.location.search)}>
                            API Description
                        </Button>
                        }
                    </div>
                </div>
            )}
            {/* <Divider className={c.divider} />
            <div className={c.option}>
                <div>
                    <Link20Regular />
                </div>
                <div className={c.optionInfo}>
                    <div className={c.title}>
                        <Body1Strong>Endpoint URL</Body1Strong>
                        <Link href="#" className={c.link}>
                            <Caption1>Copy URL</Caption1> <CopyRegular />
                        </Link>
                    </div>
                    <Body1 className={c.description}>Use this URL to send requests to the API's server.</Body1>
                </div>
            </div>
            <Divider className={c.divider} />
            <div className={c.option}>
                <div>
                    <Document20Regular />
                </div>
                <div className={c.optionInfo}>
                    <div className={c.title}>
                        <Body1Strong>[Insert provider_name] developer portal</Body1Strong>
                        <Link href="#" className={c.link}>
                            <Caption1>Copy URL</Caption1> <CopyRegular />
                        </Link>
                        <Link href="#" className={c.link}>
                            <Caption1>Open in a new tab</Caption1> <OpenRegular />
                        </Link>
                    </div>
                    <Body1 className={c.description}>Gain comprehensive insights into the API.</Body1>
                </div>
            </div> */}
        </div>
    )
}

export default Options
