export type TOption = {value: string; label: string}
export type TTermsOfService = {url: string}
export type TExternalDocumentation = {title: string; url: string}
export type TSpecification = {name: string; version: string}
export type TDeploymentServer = {runtimeUri: string}
export type TLicense = {
    name: string
    url: string
    identifier: string
}
export type TContact = {
    name: string
    url: string
    email: string
}

export type TApi = {
    name: string
    title: string
    kind: string
    lastUpdated: string
    description?: string
    summary?: string
    lifecycleStage?: string
    termsOfService?: TTermsOfService
    license?: TLicense
    externalDocumentation?: TExternalDocumentation[]
    contacts?: TContact[]
    customProperties?: any
}

export type TApiVersion = {
    name: string
    title: string
    lifecycleStage: string
}

export type TApiDefinition = {
    name: string
    title: string
    description?: string
    specification: TSpecification
}

export type TApiDeployment = {
    name: string
    title: string
    environment: string
    server: TDeploymentServer
    description?: string
    recommended?: boolean
    customProperties?: any
}

export type TConfigAuthentication = {
    azureAdInstance: string
    clientId: string
    tenantId: string
    scopes: string
}
export type TConfig = {
    authentication: TConfigAuthentication
    title: string
    dataApiHostName: string
}
