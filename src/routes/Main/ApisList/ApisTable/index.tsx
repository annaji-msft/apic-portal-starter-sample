import {FC} from "react"
import {Link} from "react-router-dom"
import {
    Table,
    TableBody,
    TableCell,
    TableCellLayout,
    TableHeader,
    TableHeaderCell,
    TableRow,
} from "@fluentui/react-components"
import {TApi} from "../../../../types.ts"
import {TableColumns} from "../../../../constants.tsx"

import c from "./index.module.scss"

const ApisTable: FC<{apis: TApi[] | null}> = ({apis}) => {
    return (
        <div className={c.container}>
            <Table size={"small"} aria-label={"APIs List table"}>
                <TableHeader>
                    <TableRow>
                        {TableColumns.map(column => (
                            <TableHeaderCell key={column.value}>
                                <b>{column.label}</b>
                            </TableHeaderCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {apis?.map(api => (
                        <TableRow key={api.name}>
                            <TableCell>
                                <Link to={"detail/" + api.name + window.location.search} className={c.link}>
                                    {api.title}
                                </Link>
                            </TableCell>
                            <TableCell>{api.kind.toUpperCase()}</TableCell>
                            <TableCell>
                                <TableCellLayout truncate title={api.description}>
                                    {api.description}
                                </TableCellLayout>
                            </TableCell>
                            <TableCell>{new Date(api.lastUpdated).toLocaleDateString()}</TableCell>
                            {/* <TableCell>TODO</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ApisTable
