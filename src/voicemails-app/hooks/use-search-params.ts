import { useLocation, useParams, useSearchParams } from "react-router-dom"
import queryStringToPage from "contacts-app/utils/query-string-to-page"
import queryStringToStatus from "voicemails-app/utils/querystring-to-status"
import { ALL, defaultFilterValues } from "voicemails-app/constants/filters.constants"
import { parse } from 'qs'
import queryStringToWhen from "voicemails-app/utils/querystring-to-when"
import useGetCurrentTab from "./use-get-current-tab"
import queryStringToAssignedUser from "voicemails-app/utils/querystring-to-assigned-user"
import queryStringToDuration from "voicemails-app/utils/querystring-to-duration"
import { useCurrentUser } from "titanium/common/context/user.context"

const useAppUrlParams = () => {
    const [params] = useSearchParams()
    const currentTab = useGetCurrentTab()
    const { id: currentUserId } = useCurrentUser()

    const page = queryStringToPage(params.get('page'))
    const selectedVoicemailId = params.get('open')
    const filtersVisible = params.get('filtersVisible') || false
    const voicemailId = params.get('id') || defaultFilterValues.voicemailId
    const voicemailStatus = queryStringToStatus(params.get('status'))
    const contactId = params.get('contact[id]') || defaultFilterValues.contactId
    const assignedTo = queryStringToAssignedUser(params.get('assigned'), currentTab, currentUserId)
    const when = queryStringToWhen(params.get('when'))
    let teste
    let ringGroups: string[] = [] // (value ? value.split(',') : defaultValues.ringGroups)
    if(Array.isArray(parse(params.toString())?.ringGroups)) {
        teste = parse(params.toString())?.ringGroups as string[]
        ringGroups = teste.map(item => item) 
    }
    const duration = queryStringToDuration(params.get('duration'))

    return {
        currentTab,
        page,
        selectedVoicemailId,
        filtersVisible,
        voicemailId,
        voicemailStatus,
        contactId,
        assignedTo,
        when,
        ringGroups,
        duration
    }
}

export default useAppUrlParams
