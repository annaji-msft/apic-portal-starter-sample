import {FC} from "react"
import {Body1, Body1Strong, Link} from "@fluentui/react-components"
import {Open16Regular} from "@fluentui/react-icons"
import {TApi} from "../../../types"

import c from "./index.module.scss"

const About: FC<{api: TApi}> = ({api}) => (
    <div className={c.about}>
        <Body1>{api.description}</Body1>
        <Body1Strong className={c.caption}>External documentation</Body1Strong>
        {!!api.externalDocumentation?.length && (
            <>
                {api.externalDocumentation.map(externalDoc => (
                    <Link href={externalDoc.url} target="_blank" className={c.link} key={externalDoc.title}>
                        {externalDoc.title} <Open16Regular />
                    </Link>
                ))}
            </>
        )}
        <Body1Strong className={c.caption}>Contact information</Body1Strong>
        {!!api.contacts?.length && (
            <>
                {api.contacts?.map(contact => (
                    <Link href={`mailto:${contact.email}`} target="_blank" className={c.link} key={contact.name}>
                        {contact.name} <Open16Regular />
                    </Link>
                ))}
            </>
        )}
    </div>
)

export default About
