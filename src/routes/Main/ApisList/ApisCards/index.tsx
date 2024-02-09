import {FC, useState} from "react"
import {useNavigate} from "react-router-dom"
import {Menu, MenuButton, MenuItem, MenuList, MenuPopover, MenuTrigger, Tooltip} from "@fluentui/react-components"
import {
    CheckmarkCircle12Regular,
    LinkRegular,
    MailRegular,
    MoreHorizontalRegular,
    ShareRegular,
} from "@fluentui/react-icons"
import VsCodeLogo from "../../../../components/logos/VsCodeLogo.tsx"
import {TApi} from "../../../../types.ts"

import c from "./index.module.scss"

const ShareSubmenu: FC<{shareLink: string; onLinkCopy: (isCopied: boolean) => void}> = ({shareLink, onLinkCopy}) => (
    <Menu onOpenChange={e => e.stopPropagation()}>
        <MenuTrigger disableButtonEnhancement>
            <MenuItem icon={<ShareRegular />}>Share</MenuItem>
        </MenuTrigger>

        <MenuPopover>
            <MenuList>
                <MenuItem
                    icon={<MailRegular />}
                    onClick={e => {
                        e.stopPropagation()
                        window.open(`mailto:?body=` + shareLink)
                    }}
                >
                    Email
                </MenuItem>
                <MenuItem
                    icon={<LinkRegular />}
                    onClick={e => {
                        e.stopPropagation()
                        navigator.clipboard.writeText(shareLink)
                        onLinkCopy(true)
                    }}
                >
                    Copy link
                </MenuItem>
            </MenuList>
        </MenuPopover>
    </Menu>
)

const ApiCard: FC<{api: TApi}> = ({api}) => {
    const navigate = useNavigate()
    const [isCopied, setIsCopied] = useState<boolean>(false)

    return (
        <Tooltip
            content={
                <div className={c.copiedTooltip}>
                    <CheckmarkCircle12Regular />
                    Copied to clipboard
                </div>
            }
            relationship="description"
            visible={isCopied}
            positioning="after-bottom"
            onVisibleChange={() => setTimeout(() => setIsCopied(false), 5000)}
        >
            <div className={c.apiCard} onClick={() => navigate("detail/" + api.name + window.location.search)}>
                <div className={c.content}>
                    {!!api.kind && (
                        <div className={c.tags}>
                            <span>API</span>
                            <span>{api.kind}</span>
                        </div>
                    )}
                    <h4>{api.title}</h4>
                    <p className={c.description}>{api.description}</p>
                </div>

                <Menu onOpenChange={e => e.stopPropagation()}>
                    <MenuTrigger disableButtonEnhancement>
                        <Tooltip content="More actions" relationship="description" hideDelay={0}>
                            <MenuButton
                                appearance="transparent"
                                icon={<MoreHorizontalRegular />}
                                className={c.menuButton}
                            />
                        </Tooltip>
                    </MenuTrigger>

                    <MenuPopover>
                        <MenuList>
                            {/* <MenuItem icon={<VsCodeLogo />}>Open in Visual Studio Code</MenuItem> */}
                            <ShareSubmenu
                                shareLink={window.location.href + "detail/" + api.name + window.location.search}
                                onLinkCopy={setIsCopied}
                            />
                        </MenuList>
                    </MenuPopover>
                </Menu>
            </div>
        </Tooltip>
    )
}

const ApisCards: FC<{apis: TApi[] | null}> = ({apis}) => {
    return <div className={c.container}>{apis?.map(api => <ApiCard key={api.name} api={api} />)}</div>
}

export default ApisCards
