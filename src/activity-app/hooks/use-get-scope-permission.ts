import { SCOPE_ALL, SCOPE_RING_GROUP } from "activity-app/constants/policies.contants"
import { AGENT, ALL, RING_GROUP } from "activity-app/constants/scope-types.constants"
import { usePolicies } from "titanium/common/context/policies.context"

const useGetScopePermission = () => {
    const policies = usePolicies()
    return [
        {
            name: ALL,
            active: Boolean(policies[SCOPE_ALL])
        },
        {
            name: RING_GROUP,
            active: Boolean(policies[SCOPE_RING_GROUP])
        },
        {
            name: AGENT,
            active: true
        }
    ].find(scope => scope.active)?.name
}

export default useGetScopePermission
