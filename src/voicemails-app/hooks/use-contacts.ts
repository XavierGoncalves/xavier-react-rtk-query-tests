import { useState, useEffect } from 'react'
import { useHttpClient } from 'titanium/common/context/http.context'
import { VoicemailUseContact } from 'types'
import { fetchContactApi, fetchContactsApi } from 'voicemails-app/api/fetch-contacts.api'
import { LOADING } from 'voicemails-app/constants/state-types.constants'
import { VALUE_FILTER_ALL } from '../constants/ui.constants'

export const useContacts = ({
  logger,
  query,
  selectedValue,
  tryAgain = 0,
  isOpen,
  typeMoreMessage = '',
  noResultsMessage = ''
}) => {
  const http = useHttpClient()
  const [contacts, setContacts] = useState<VoicemailUseContact[]>([])
  const [totalContacts, setTotalContacts] = useState(0)
  const [status, setStatus] = useState<string | null>(null)
  const [noResultsMsg, setNoResultsMsg] = useState(noResultsMessage)
  const [error, setError] = useState(false)

  const isQueryEmpty = query.length === 0
  const isUnassigned = selectedValue === VALUE_FILTER_ALL

  const fetchContacts = async () => {
    try {
      const { contacts, total } = await fetchContactsApi({
        http,
        searchQuery: query || null
      })

      return {
        contacts,
        total: isQueryEmpty ? total - 1 : total
      }
    } catch (error) {
      setError(true)
      logger.error(error, {
        message: 'Error while fetching contacts'
      })

      return { contacts: [], total: 0 }
    }
  }

  const fetchContact = async () => {
    try {
      const contact = await fetchContactApi({
        http,
        id: selectedValue
      })

      return contact
    } catch (error) {
      setError(true)
      logger.error(error, {
        message: 'Error while fetching contact'
      })
      return null
    }
  }

  const getContacts = async () => {
    const isQueryTooShort = query.length > 0 && query.length < 3

    if (isQueryTooShort) {
      setContacts([])
      setTotalContacts(0)
      setNoResultsMsg(typeMoreMessage)
    } else {
      setStatus(LOADING)
      setError(false)

      const { contacts, total } = await fetchContacts()

      const containsSelected = contacts.some(
        contact => contact.id === selectedValue
      )

      const shouldFetchSelected =
        selectedValue && !isUnassigned && !containsSelected && isQueryEmpty

      if (shouldFetchSelected) {
        const contact = await fetchContact()

        setContacts(contact ? [contact, ...contacts] : contacts)
      } else {
        setContacts(contacts)
      }

      setTotalContacts(total)
      setNoResultsMsg(noResultsMessage)
      setStatus(null)
    }
  }

  useEffect(() => {
    getContacts()
  }, [query, isOpen, selectedValue])

  useEffect(() => {
    if (tryAgain > 0) {
      getContacts()
    }
  }, [tryAgain])

  return {
    contacts,
    totalContacts,
    status,
    noResultsMsg,
    error
  }
}
