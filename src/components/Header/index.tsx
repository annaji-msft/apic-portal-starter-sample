import {useEffect, useState} from "react"
import * as msal from "@azure/msal-browser"
import {Button, Link, Text} from "@fluentui/react-components"
import CloverLogo from "../logos/CloverLogo"
import {LocalStorageKey, useLocalStorage} from "../useLocalStorage"
import {TConfig} from "../../types"
import {useNavigate} from "react-router-dom"
import c from "./index.module.scss"
import colors from "../../colors.module.scss"

const Header = () => {
    const navigate = useNavigate()
    const accessToken = useLocalStorage(LocalStorageKey.accessToken)
    const dataApiEndpoint = useLocalStorage(LocalStorageKey.dataApiEndpoint)

    const [config, setConfig] = useState<TConfig>()

    const fetchConfig = async () => {
        const dataJson = {
            "dataApiHostName": "happydev.data.eastus.azure-apicenter.ms",
            "title": "happydev",
            "authentication": {
                "clientId": "5bebdc5c-01ef-4a8c-ba07-e0623b9d110b",
                "tenantId": "888d76fa-54b2-4ced-8ee5-aac1585adee7",
                "scopes": "https://azure-apicenter.net/user_impersonation",
                "azureAdInstance": "https://login.microsoftonline.com/"
            },
            "enabled": true
        };
        setConfig(dataJson);
        dataApiEndpoint.set(dataJson.dataApiHostName);
    }

    useEffect(() => {
        fetchConfig()
    }, [])

    const signInWithAad = async (clientId: string, signinTenant: string, replyUrl?: string): Promise<void> => {
        const authorityUrl = config?.authentication.azureAdInstance + signinTenant

        const msalConfig: msal.Configuration = {
            auth: {
                clientId: clientId,
                authority: authorityUrl,
            },
        }

        if (replyUrl) {
            msalConfig.auth.redirectUri = replyUrl
        }

        const msalInstance = new msal.PublicClientApplication(msalConfig)
        await msalInstance.initialize()

        const loginRequest = {
            scopes: [config.authentication.scopes],
        }

        const response = await msalInstance.loginPopup(loginRequest)
        accessToken.set(response.accessToken)
    }

    return (
        <header>
            <div className={c.logo}>
                {!!config && (
                    <>
                        <CloverLogo />{" "}
                        <Text size={400} weight="semibold">
                            {config.title}
                        </Text>
                    </>
                )}
            </div>
            <div className={c.headerRight}>
                <div className={c.headerLinks}>
                    <Link appearance="subtle" href="#" onClick={() => navigate("/")}>
                        Home
                    </Link>
                    <Link appearance="subtle" href="https://learn.microsoft.com/en-us/azure/api-center/overview" target="_blank" rel="noopener noreferrer">
                        Help
                    </Link>
                </div>
                {!accessToken.get() && !!config && (
                    <div className={c.signupButtonWrapper}>
                        <Button
                            appearance="primary"
                            style={{backgroundColor: colors.blueButton, minWidth: "unset"}}
                            onClick={() =>
                                signInWithAad(config.authentication.clientId, config.authentication.tenantId)
                            }
                        >
                            Sign in
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header
