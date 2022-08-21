
import { AGENT, ALL, RING_GROUP } from "activity-app/constants/scope-types.constants"
import { VOICEMAILS_SCOPE_AGENT, VOICEMAILS_SCOPE_ALL, VOICEMAILS_SCOPE_RING_GROUP } from "contacts-app/constants/policies.constants"
import { usePolicies } from "titanium/common/context/policies.context"

const useGetScopePermission = () => {
    const policies = usePolicies()
    return [
        {
            name: ALL,
            active: Boolean(policies[VOICEMAILS_SCOPE_ALL])
        },
        {
            name: RING_GROUP,
            active: Boolean(policies[VOICEMAILS_SCOPE_RING_GROUP])
        },
        {
            name: VOICEMAILS_SCOPE_AGENT,
            active: true
        }
    ].find(scope => scope.active)?.name
}

export default useGetScopePermission
