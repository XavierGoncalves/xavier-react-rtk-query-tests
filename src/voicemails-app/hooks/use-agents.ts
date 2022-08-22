import { useState, useEffect } from 'react'
import { STATE_LOADING } from 'voicemails-app/constants/state-types.constants'
import {
  VALUE_FILTER_ALL,
  VALUE_FILTER_UNASSIGNED
} from '../constants/ui.constants'

export const useAgents = ({
  http,
  logger = console,
  perPage = 20,
  query,
  selectedValue,
  currentUserId = '',
  isOpen,
  tryAgain = 0,
  typeMoreMessage = '',
  noResultsMessage = '',
  fetchSingle,
  fetchMultiple,
  assignedUsers = [],
  isFilter = false
}) => {
  const [users, setUsers] = useState<any>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [noResultsMsg, setNoResultsMsg] = useState(noResultsMessage)
  const [error, setError] = useState(false)

  const isQueryTooShort = query.length > 0 && query.length < 3
  const queryEmpty = query.length === 0
  const isUnassigned = selectedValue === VALUE_FILTER_UNASSIGNED

  const filterCurrentUser = arr => arr.filter(({ id }) => id !== currentUserId)

  const fetchUsers = async () => {
    try {
      const { data: newAgents, total } = await fetchMultiple(
        {
          perPage,
          query: query || null
        },
        http
      )

      const responseContainsCurrentUser = newAgents.some(
        ({ id }) => id === currentUserId
      )

      return {
        newAgents: filterCurrentUser(newAgents),
        total: responseContainsCurrentUser || queryEmpty ? total - 1 : total
      }
    } catch (error) {
      setError(true)
      logger.error(error, {
        message: 'Error while fetching users'
      })

      return { newAgents: [], total: null }
    }
  }

  const fetchUser = async () => {
    try {
      const user = await fetchSingle(
        {
          id: selectedValue
        },
        http
      )
      return user
    } catch (error) {
      logger.error(error, {
        message: 'Error while fetching user'
      })
      setError(true)
      return {
        user: null
      }
    }
  }

  const getUsers = async () => {
    if (isQueryTooShort) {
      setUsers([])
      setTotalUsers(0)
      setNoResultsMsg(typeMoreMessage)
    } else {
      setStatus(STATE_LOADING)
      setError(false)

      const { newAgents, total } = await fetchUsers()

      const responseContainsSelectedUser = newAgents.some(
        agent => agent.id === selectedValue
      )

      const assignedContainsSelectedUser = assignedUsers.some(
        (agent: any) => agent.id === selectedValue
      )

      const shouldFetchSelected =
        selectedValue &&
        !isUnassigned &&
        !responseContainsSelectedUser &&
        !assignedContainsSelectedUser &&
        selectedValue !== currentUserId &&
        selectedValue !== VALUE_FILTER_ALL &&
        selectedValue !== VALUE_FILTER_UNASSIGNED &&
        queryEmpty

      const shouldAddSelected =
        assignedContainsSelectedUser &&
        !responseContainsSelectedUser &&
        queryEmpty &&
        selectedValue !== currentUserId

      if (shouldFetchSelected) {
        const { user } = await fetchUser()
        setUsers(user ? [user, ...newAgents] : newAgents)
      } else {
        if (shouldAddSelected) {
          const selectedUser: any = assignedUsers.find(
            (agent: any) => agent.id === selectedValue
          )
          setUsers([
            selectedUser,
            ...newAgents.filter(agent => agent.id !== selectedValue)
          ])
        } else {
          setUsers(newAgents)
        }
      }

      setTotalUsers(total)
      setNoResultsMsg(noResultsMessage)
      setStatus(null)
    }
  }

  useEffect(() => {
    if (isFilter) getUsers()
  }, [])

  useEffect(() => {
    if (isOpen) {
      getUsers()
    }
  }, [query, isOpen, selectedValue])

  useEffect(() => {
    if (tryAgain > 0) {
      getUsers()
    }
  }, [tryAgain])

  return {
    users,
    totalUsers,
    status,
    noResultsMsg,
    isQueryTooShort,
    error
  }
}
