import {Body1Strong, Button, Link, Subtitle1, Subtitle2, Text} from "@fluentui/react-components"
import CloverLogo from "../logos/CloverLogo"

import c from "./index.module.scss"
import colors from "../../colors.module.scss"

const Footer = () => {
    return (
        <footer>
            {/* <div className={c.footerTop}>
                <div className={c.logo}>
                    <CloverLogo /> <Subtitle1>Contoso</Subtitle1>
                </div>
                <div className={c.footerRight}>
                    <div className={c.footerLinks}>
                        <Link appearance="subtle" href="#" className={c.link}>
                            <Subtitle2>About</Subtitle2>
                        </Link>
                        <Link appearance="subtle" href="#" className={c.link}>
                            <Subtitle2>Community</Subtitle2>
                        </Link>
                        <Link appearance="subtle" href="#" className={c.link}>
                            <Subtitle2>Use cases</Subtitle2>
                        </Link>
                        <Link appearance="subtle" href="#" className={c.link}>
                            <Subtitle2>Resources</Subtitle2>
                        </Link>
                        <Link appearance="subtle" href="#" className={c.link}>
                            <Subtitle2>Help</Subtitle2>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={c.footerDivider}></div> */}

            <div className={c.footerBottom}>
                <div className={c.bottomLinks}>
                    <Body1Strong className={c.link}>&copy; Copyright 2023</Body1Strong>
                    {/* <Link appearance="subtle" href="#">
                        <Body1Strong className={c.link}>Terms</Body1Strong>
                    </Link>
                    <Link appearance="subtle" href="#">
                        <Body1Strong className={c.link}>Privacy</Body1Strong>
                    </Link> */}
                </div>
            </div>
        </footer>
    )
}

export default Footer
