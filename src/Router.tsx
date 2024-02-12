import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Landing from "./routes/Main"
import ApiDetail from "./routes/Main/ApiDetail"
import Layout from "./Layout.tsx"
import ElementsApiComponent from './ElementsApiComponent';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Landing />,
                children: [
                    {
                        path: "detail/:id",
                        element: <ApiDetail />,
                    },
                ],
            },
            {
                path: "desc/:id",
                element: <ElementsApiComponent />,
            },
        ],
    },
])

const Router = () => <RouterProvider router={router} />

export default Router
