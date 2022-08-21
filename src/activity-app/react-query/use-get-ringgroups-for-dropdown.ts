import { useQuery } from "@tanstack/react-query"
import fetchRingGroups from "activity-app/api/fetch-ring-groups.api"
import { ALL_USER } from "activity-app/constants/filters.constants"
import isSearchTextTooShort from "activity-app/utils/is-searchtext-too-short"
import { useHttpClient } from "titanium/common/context/http.context"
import { useCurrentUser } from "titanium/common/context/user.context"

const useGetRinGroupsForDropdown = (searchText: string, selectedValue: string[]) => {
    const http = useHttpClient()
    const currentUser = useCurrentUser()
    return useQuery(['ringGroups', 'dropdown', { searchText }], () => fetchRingGroups({
        searchText,
        http
    }), {
        // enabled: false,
        staleTime: 0,
        enabled: !isSearchTextTooShort(searchText),
        select(data) {
            if (isSearchTextTooShort(searchText)) {
                return {
                    ringGroups: [],
                    total: 0
                }
            }
            //ADD "ALL" USER
            // const newUsers = searchText === '' ?
            //     [ALL_USER, currentUser, ...data.ringGroups.filter(({ id }) => id !== currentUser.id)]
            //     :
            //     [...data.ringGroups.filter(({ id }) => id !== currentUser.id)]

            // const { id: selectedUserId } = selectedValue
            // //console.log('useGetUsersForDropdown - newUsers ->', newUsers)
            // const containsSelected = newUsers.some(user => user.id === selectedUserId)
            // const shouldAddSelected =
            //     selectedUserId && selectedUserId !== 'ALL' && !containsSelected && searchText === ''
            // //console.log('useGetUsersForDropdown - shouldAddSelected ->', shouldAddSelected)
            // const merdas = shouldAddSelected
            //     ? [...newUsers, selectedValue]
            //     : newUsers

            return {
                ringGroups: data?.ringGroups,
                total: data.total
            }

            //         const containsSelected = users.some(user => user.id === selectedUserId)
            //         const shouldAddSelected =
            //     selectedUserId && selectedUserId !== 'ALL' && !containsSelected

            //   shouldAddSelected
            //     ? setDropdownOptions([...users, value])
            //     : setDropdownOptions(users)
        }
    })
}


export default useGetRinGroupsForDropdown
