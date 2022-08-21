import { Dropdown } from '@titanium/components'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ErrorMessage from 'voicemails-app/components/common/dropdown-error-message/ErrorMessage.component'
import { ERROR, LOADING, SUCCESS } from 'voicemails-app/constants/state-types.constants'
import { useContacts } from 'voicemails-app/hooks/use-contacts'
import { VALUE_FILTER_ALL } from '../../../../../constants/ui.constants'

// propTypes = {
//   http: func.isRequired,
//   includeAllOption: bool,
//   staticOptions: array,
//   borderless: bool,
//   logger: object,
//   maxOptions: number,
//   onChange: func.isRequired,
//   selectedContact: object,
//   t: func,
//   dataTestId: string
// }


const ContactDropdown = ({
  onChange,
  selectedContact,
  borderless = false,
  dataTestId = ''
}) => {
  const [t] = useTranslation()
  const { id: selectedContactId } = selectedContact
  const [tryAgain, setTryAgain] = useState(0)
  const [query, setQuery] = useState('')
  const isQueryTooShort = query.length > 0 && query.length < 3
  const [isOpen, setIsOpen] = useState(false)
  const mappedStaticOptions = [
    {
      id: VALUE_FILTER_ALL,
      name: 'fields.assigned.all',
      phones: null
    }
  ].map(item => ({
    ...item,
    name: t(item.name),
    hasBorderBottom: true
  }))

  const ALL_USER = { id: VALUE_FILTER_ALL, label: null }

  const statusType = {
    [LOADING]: Dropdown.LOADING,
    [SUCCESS]: Dropdown.SUCCESS,
    [ERROR]: Dropdown.ERROR
  }

  const {
    contacts,
    totalContacts,
    status,
    noResultsMsg,
    error
  } = useContacts({
    query,
    selectedValue: selectedContactId,
    isOpen,
    tryAgain,
    logger: console,
    typeMoreMessage: t('contactDropdown.typeMore'),
    noResultsMessage: t('contactDropdown.empty')
  })

  const getSelectedContact = () => {
    const foundInContacts = contacts.find(({ id }) => id === selectedContactId)
    const foundInStaticOptions = mappedStaticOptions.find(
      ({ id }) => id === selectedContactId
    )
    const option = foundInStaticOptions || foundInContacts || selectedContact

    if (!option) return
    return (
      <Dropdown.Option
        key={option.id}
        value={option.id}
        hasBorderBottom={false}
      >
        {option.name || option.label}
      </Dropdown.Option>
    )
  }

  const onChangeHandler = e => {
    const id = e.target.value
    const { name, phones } = contacts.find(contact => contact.id === id) || {}
    const phone = phones && phones.length && phones[0]
    const label = name || phone || null

    const result = id !== VALUE_FILTER_ALL ? { id, label } : ALL_USER
    onChange(result)
  }

  const [selectedFallback, setSelectedFallback] = useState(getSelectedContact())
  useEffect(() => {
    const result = getSelectedContact()
    if (result) setSelectedFallback(result)
  }, [selectedContactId, contacts])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [tryAgain, error])

  const remainingContacts = totalContacts - contacts.length

  const renderOptions = () => {
    const optionsArray = [
      ...(query.length > 0 ? [] : mappedStaticOptions),
      ...contacts.map(contact => ({...contact, hasBorderBottom: false }))
    ]

    return contacts.length && !isQueryTooShort
      ? optionsArray.map((option) => (
        <Dropdown.Option
          key={option.id}
          value={option.id}
          hasBorderBottom={option.hasBorderBottom}
          description={option.name ? option.phones && option.phones[0] : null}
        >
          {option.name || (option.phones && option.phones[0])}
        </Dropdown.Option>
      ))
      : null
  }

  return error ? (
    <>
      <Dropdown
        disabled
        searchable={false}
        borderless={borderless}
        onChange={() => null}
        dataTestId={dataTestId}
      />
      <ErrorMessage
        onRetry={() => setTryAgain(tryAgain + 1)}
        errorMessage={t('contactDropdown.errorMessage')}
        retryMessage={t('contactDropdown.retryMessage')}
        dataPrefix={dataTestId}
      />
    </>
  ) : (
    <Dropdown
      selectedFallback={selectedFallback}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      dataTestId={dataTestId}
      loadingText={t('contactDropdown.loading')}
      selectionPlaceholder={t('contactDropdown.selectPlaceholder')}
      searchPlaceholder={t('contactDropdown.search')}
      selectedValue={selectedContactId}
      status={statusType[status || '']}
      searchable
      borderless={borderless}
      onChange={onChangeHandler}
      onSearch={query => setQuery(query.trim())}
      refineSearchMessage={
        totalContacts && remainingContacts > 0
          ? t('contactDropdown.refineSearch', {
            remaining: remainingContacts
          })
          : null
      }
      noResultsMessage={noResultsMsg}
    >
      {renderOptions()}
    </Dropdown>
  )
}

export default ContactDropdown
