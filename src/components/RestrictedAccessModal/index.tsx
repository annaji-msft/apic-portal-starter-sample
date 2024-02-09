import {Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, Link} from "@fluentui/react-components"
import {LocalStorageKey, useLocalStorage} from "../useLocalStorage"
import Lock from "../logos/Lock"

import c from "./index.module.scss"

const RestrictedAccessModal = () => {
    const accessToken = useLocalStorage(LocalStorageKey.accessToken)
    const isResctricted = useLocalStorage(LocalStorageKey.isResctricted)

    return (
        <Dialog open>
            <DialogSurface>
                <DialogBody>
                    <DialogContent>
                        <div className={c.restrictedContent}>
                            <Lock />
                            <div>
                                You are not authorized to access this portal. Please contact the portal administrator
                                for assistance. See{" "}
                                <Link
                                    href="https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal?tabs=delegate-condition"
                                    target="_blank"
                                >
                                    documentation
                                </Link>{" "}
                                for further details.
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            appearance="secondary"
                            onClick={() => {
                                accessToken.remove()
                                isResctricted.set("false")
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

export default RestrictedAccessModal
