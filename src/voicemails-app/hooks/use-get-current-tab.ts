import { useLocation } from "react-router-dom"
import { TAB_ALL, TAB_ASSIGNED_TO_ME } from "voicemails-app/constants/ui.constants"
import { ALL_VOICEMAILS_URL } from "voicemails-app/constants/url.constants"

const useGetCurrentTab = () => {
    const location = useLocation()
    switch (location.pathname) {
        case ALL_VOICEMAILS_URL:
            return TAB_ALL
        default:
            return TAB_ASSIGNED_TO_ME
    }
}

export default useGetCurrentTab
