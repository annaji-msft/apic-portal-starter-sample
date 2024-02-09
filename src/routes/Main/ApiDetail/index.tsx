import {FC, useEffect, useState} from "react"
import {Link, useParams} from "react-router-dom"
import {Divider, Dropdown, Option, Spinner, Subtitle2, Tab, TabList} from "@fluentui/react-components"
import {CircleFilled, Dismiss16Regular} from "@fluentui/react-icons"
import {LocalStorageKey, useLocalStorage} from "../../../components/useLocalStorage.tsx"
import {useFetchData} from "../../../components/fetchData.tsx"
import {TApi, TApiDefinition, TApiDeployment, TApiVersion} from "../../../types.ts"

import About from "./About.tsx"
import Options from "./Options.tsx"

import c from "./index.module.scss"

enum TTab {
    options = "options",
    about = "about",
}

const tabs: Record<TTab, FC<{api: TApi; version?: string; definition?: string}>> = {
    [TTab.options]: Options,
    [TTab.about]: About,
}

const ApiDetail = () => {
    const bearer = useLocalStorage(LocalStorageKey.accessToken).get()
    const fetchData = useFetchData()

    const {id} = useParams() as {id: string}
    const [api, setApi] = useState<TApi>()
    const [versions, setVersions] = useState<[TApiVersion]>()
    const [definitions, setDefinitions] = useState<[TApiDefinition]>()
    const [deployments, setDeployments] = useState<[TApiDeployment]>()
    const [selectedTab, setSelectedTab] = useState(TTab.options)
    const [selectedVersion, setSelectedVersion] = useState<string[]>([])
    const [selectedVersionLabel, setSelectedVersionLabel] = useState<string>(`Version isn't available`)
    const [selectedDefinition, setSelectedDefinition] = useState<string[]>([])
    const [selectedDefinitionLabel, setSelectedDefinitionLabel] = useState<string>(`Definition isn't available`)
    const [selectedDeployment, setSelectedDeployment] = useState<string[]>([])
    const [selectedDeploymentLabel, setSelectedDeploymentLabel] = useState<string>(`Deployment isn't available`)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        if (bearer) {
            fetchData("apis/" + id).then(setApi)
            fetchData("apis/" + id + "/versions").then(versions => {
                setVersions(versions.value)
                if (versions.value.length > 0) {
                    setSelectedVersion([versions.value[0].name])
                    setSelectedVersionLabel(versions.value[0].title)
                }
            })
            fetchData("apis/" + id + "/deployments").then(deployments => {
                setDeployments(deployments.value)
                if (deployments.value.length > 0) {
                    setSelectedDeployment([deployments.value[0].name])
                    setSelectedDeploymentLabel(deployments.value[0].title)
                }
            })
        }
    }, [id, bearer])

    useEffect(() => {
        setIsLoading(true)
        if (bearer && selectedVersion.length > 0) {
            fetchData("apis/" + id + "/versions/" + selectedVersion[0] + "/definitions")
                .then(definitions => {
                    setDefinitions(definitions.value)
                    if (definitions.value.length > 0) {
                        setSelectedDefinition([definitions.value[0].name])
                        setSelectedDefinitionLabel(definitions.value[0].title)
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }, [selectedVersion, bearer])

    const Selected = tabs[selectedTab]

    return (
        <aside className={c.apiDetail}>
            <div className={c.container}>
                {!api ? (
                    <Spinner size="small" label={"Loading..."} labelPosition="below" className={c.spinner} />
                ) : (
                    <>
                        <div className={c.labelRow}>
                            <h1>{api.title}</h1>
                            <Link to={"/" + window.location.search}>
                                <Dismiss16Regular />
                            </Link>
                        </div>

                        <div className={c.metadataRow}>
                            {/* TODO: add CREATOR */}
                            {/* <p>Creator {api.contacts?.name}</p>
                            <CircleFilled /> */}
                            <p>Last update {new Date(api.lastUpdated).toLocaleDateString()}</p>
                        </div>

                        <Subtitle2>Select the API version</Subtitle2>
                        <Divider className={c.divider} />

                        <p>
                            Choose the API version, definition format, and deployment lifecycle stage. You can then
                            download the definition, open it in Visual Studio Code, or run it in Postman.
                        </p>

                        <div className={c.dropdown}>
                            <label htmlFor={"version"}>Version</label>
                            <Dropdown
                                id={"version"}
                                placeholder={"Select API version"}
                                onOptionSelect={(_, data) => {
                                    setSelectedVersion(data.selectedOptions)
                                    setSelectedVersionLabel(data.optionText ?? "")
                                }}
                                value={selectedVersionLabel}
                                selectedOptions={selectedVersion}
                            >
                                {!!versions?.length &&
                                    versions.map(o => (
                                        <Option key={o.name} value={o.name}>
                                            {o.title}
                                        </Option>
                                    ))}
                            </Dropdown>
                        </div>

                        <div className={c.dropdown}>
                            <label htmlFor={"definition"}>Definition format</label>
                            <Dropdown
                                id={"definition"}
                                placeholder={"Select API definition"}
                                onOptionSelect={(_, data) => {
                                    setSelectedDefinition(data.selectedOptions)
                                    setSelectedDefinitionLabel(data.optionText ?? "")
                                }}
                                value={selectedDefinitionLabel}
                                selectedOptions={selectedDefinition}
                            >
                                {!!definitions?.length &&
                                    definitions.map(o => (
                                        <Option key={o.name} value={o.name}>
                                            {o.title}
                                        </Option>
                                    ))}
                            </Dropdown>
                        </div>

                        <div className={c.dropdown}>
                            <label htmlFor={"deployment"}>Deployment</label>
                            <Dropdown
                                id={"deployment"}
                                placeholder={"Select deployment"}
                                onOptionSelect={(_, data) => {
                                    setSelectedDeployment(data.selectedOptions)
                                    setSelectedDeploymentLabel(data.optionText ?? "")
                                }}
                                value={selectedDeploymentLabel}
                                selectedOptions={selectedDeployment}
                            >
                                {!!deployments?.length &&
                                    deployments.map(o => (
                                        <Option key={o.name} value={o.name}>
                                            {o.title}
                                        </Option>
                                    ))}
                            </Dropdown>
                        </div>

                        <div className={c.tabsContainer}>
                            <TabList
                                selectedValue={selectedTab}
                                onTabSelect={(_, {value}) => setSelectedTab(value as TTab)}
                            >
                                <Tab value={TTab.options}>Options</Tab>
                                <Tab value={TTab.about}>More about this API</Tab>
                            </TabList>
                            <Divider />
                        </div>

                        {isLoading ? (
                            <Spinner size="small" />
                        ) : (
                            <Selected
                                api={api}
                                version={selectedVersion.length > 0 ? selectedVersion[0] : ""}
                                definition={selectedDefinition.length > 0 ? selectedDefinition[0] : ""}
                            />
                        )}
                    </>
                )}
            </div>
        </aside>
    )
}

export default ApiDetail
