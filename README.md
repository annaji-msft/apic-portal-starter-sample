### Custom API Center Portal (Experimental)

## Demo 

![happydev-portal](https://github.com/annaji-msft/apic-portal-starter/assets/42851022/e88435e5-6ca6-4a23-840b-8dc28edd8800)

This is a sample implementation of Developer portal built on top of API Center data plane APIs. \
Currently the data plane APIs are in [review](https://github.com/Azure/azure-rest-api-specs/pull/27052/files) and might change.\
The data plane apis enable building custom developer experiences for consumption and discovery. 
Example, this sample uses different styling, custom domains powered by SWA and [stoplight elements](https://github.com/stoplightio/elements) for API refernece.\
The sample is built using standard react components and hosted on [Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/overview)

## Setup

[Register a Entra ID app](https://learn.microsoft.com/en-us/azure/api-center/enable-api-center-portal#create-microsoft-entra-app-registration) Note - Skip the portal configuration steps.

[Add Entra Id users or groups to API center](https://learn.microsoft.com/en-us/azure/api-center/enable-api-center-portal#enable-sign-in-to-portal-by-microsoft-entra-users-and-groups)

This is a templated repo. Make a copy of it in your github account/org.

Update the .env file in the root of the repo and check it in. [Skip the portal configuration steps](https://learn.microsoft.com/en-us/azure/api-center/enable-api-center-portal#configure-microsoft-entra-id-provider-for-api-center-portal)
   * VITE_DATA_API_HOST_NAME="<yourapic>.data.<apicregion>.azure-apicenter.ms"
   * VITE_TITLE="<custom title say HappyDev>"
   * VITE_CLIENT_ID="<entra clientId>"
   * VITE_TENANT_ID="<entra tenantId>"
   * VITE_SCOPES="https://azure-apicenter.net/user_impersonation"
   * VITE_AZURE_AD_INSTANCE="https://login.microsoftonline.com/"
   * VITE_ENABLED=true

Create a static web app and configure with your copied repo. During create provide below configuration.
   * app_location: "/" # App source code path
   * api_location: "" # Api source code path - optional
   * output_location: "dist" # Built app content directory - optional

After the creation of static web app. Make sure the app is deployed and hosted on SWA. 

## Local development
npm install 
npm run build
npm run dev
