import { useQuery } from "@tanstack/react-query"
import fetchUsersApi from "activity-app/api/fetch-users.api"
import { ALL_USER } from "activity-app/constants/filters.constants"
import isSearchTextTooShort from "activity-app/utils/is-searchtext-too-short"
import { useHttpClient } from "titanium/common/context/http.context"
import { useCurrentUser } from "titanium/common/context/user.context"
import { ActivityAgentFilter } from "types"

const useGetUsersForDropdown = (searchText: string, selectedValue: ActivityAgentFilter) => {
    const http = useHttpClient()
    const currentUser = useCurrentUser()
    return useQuery(['users', 'dropdown', { searchText }], () => fetchUsersApi({
        searchText,
        http
    }), {
        staleTime: 0,
        enabled: !isSearchTextTooShort(searchText),
        select(data) {

            if (isSearchTextTooShort(searchText)) {
                return {
                    users: [],
                    total: 0
                }
            }
            //ADD "ALL" USER
            const newUsers = searchText === '' ?
                [ALL_USER, currentUser, ...data.users.filter(({ id }) => id !== currentUser.id)]
                :
                [...data.users.filter(({ id }) => id !== currentUser.id)]

            const { id: selectedUserId } = selectedValue
            //console.log('useGetUsersForDropdown - newUsers ->', newUsers)
            const containsSelected = newUsers.some(user => user.id === selectedUserId)
            const shouldAddSelected =
                selectedUserId && selectedUserId !== 'ALL' && !containsSelected && searchText === ''
            //console.log('useGetUsersForDropdown - shouldAddSelected ->', shouldAddSelected)
            const merdas = shouldAddSelected
                ? [...newUsers, selectedValue]
                : newUsers

            return {
                users: merdas,
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


export default useGetUsersForDropdown
