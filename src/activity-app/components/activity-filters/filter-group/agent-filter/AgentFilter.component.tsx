import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from '@cobalt/cobalt-react-components'
import { Dropdown } from '@titanium/components'
import { ALL, ALL_USER } from 'activity-app/constants/filters.constants'
import { useCurrentUser } from 'titanium/common/context/user.context'
import useGetUsersForDropdown from 'activity-app/react-query/use-get-users-for-dropdown'
import { AgentFilter as AgentFilterType } from 'types'
import isSearchTextTooShort from 'activity-app/utils/is-searchtext-too-short'


interface Props {
  value: AgentFilterType;
  onChange: (value: AgentFilterType) => void
}

const AgentFilter = ({
  value,
  onChange,
}: Props) => {
  const [t] = useTranslation()
  const currentUser = useCurrentUser()
  const { id: currentUserId } = currentUser
  const [dropdownStatus, setDropdownStatus] = useState(null)
  const [noResultsMessage, setNoResultsMessage] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')
  const { data, isFetching } = useGetUsersForDropdown(searchText, value)
  const users = data?.users || []
  const [dropdownOptions, setDropdownOptions] = useState(users)
  const total = data?.total || 0
  const remainingUsers = total - users.length

  // useEffect(() => {
  //   setDropdownStatus(null)
  //   if (!users.length) {
  //     //setDropdownOptions([])
  //     setNoResultsMessage(emptyDropdownText)
  //   } else {
  //     // const { id: selectedUserId } = value
  //     // const containsSelected = users.some(user => user.id === selectedUserId)
  //     // const shouldAddSelected =
  //     //   selectedUserId && selectedUserId !== 'ALL' && !containsSelected

  //     // shouldAddSelected
  //     //   ? setDropdownOptions([...users, value])
  //     //   : setDropdownOptions(users)
  //   }
  // }, [emptyDropdownText, users, value])

  const getSelectedUser = () => {
    if(value.id === currentUserId) {
      return (
        <Dropdown.Option
        key={currentUserId}
        value={currentUserId}
        hasBorderBottom={true}
      >
        {t('fields.agent.me')}
      </Dropdown.Option>
      )
    }
    const option = users.find(
      ({ id }) => id === value.id
    )

    if (!option) return
    return (
      <Dropdown.Option
        key={option.id}
        value={option.id}
        hasBorderBottom={false}
      >
        {/* {option.icon && <Icon name={Icon.USER} tiny />} */}
        {option.name}
      </Dropdown.Option>
    )
  }

  const [selectedFallback, setSelectedFallback] = useState(getSelectedUser())

  useEffect(() => {
    const result = getSelectedUser()
    if (result) setSelectedFallback(result)
  }, [value, users])

  const onChangeHandler = event => {
    const selectedUserId = event.target.value
    //console.log('AgentFilter - onChangeHandler - selectedUserId ->', selectedUserId)
    //console.log('AgentFilter - onChangeHandler - users ->', users)
    const selectedUser =
      selectedUserId === currentUserId
        ? currentUser
        : users.find(user => user.id === selectedUserId) || ALL_USER
    //console.log('AgentFilter - onChangeHandler - selectedUser ->', selectedUser)
    onChange(selectedUserId === ALL ? ALL_USER : selectedUser)
    setSearchText('')
  }

  const onSearchUserHandler = (query: string) => {
    if (isSearchTextTooShort(query)) {
      setNoResultsMessage(t('agentsDropdown.typeMore'))
    }
    if(users.length === 0){
      setNoResultsMessage(t('agentsDropdown.empty'))
    }
    setSearchText(query)
  }

  return (
    <Form.Field id="filters__agent" label={t('fields.agent.label')}>
      <Dropdown
        dataTestId="activity-filters__agent"
        selectedFallback={selectedFallback}
        onChange={onChangeHandler}
        selectedValue={value.id}
        selectionPlaceholder={t('agentsDropdown.selectPlaceholder')}
        searchable
        searchPlaceholder={t('agentsDropdown.search')}
        refineSearchMessage={
          total && remainingUsers > 0
            ? t('agentsDropdown.refineSearch', {
              remainingUsers
            })
            : null
        }
        onSearch={onSearchUserHandler}
        status={dropdownStatus}
        noResultsMessage={noResultsMessage}
      >
        {
          users.map(user => {
            if (user.id === ALL) {
              return (
                <Dropdown.Option key={ALL} value={ALL}>
                  {t('agentsDropdown.all')}
                </Dropdown.Option>
              )
            }
            if (user.id === currentUserId) {
              return (
                <Dropdown.Option
                  key={currentUserId}
                  value={currentUserId}
                  hasBorderBottom={true}
                >
                  {t('fields.agent.me')}
                </Dropdown.Option>
              )
            }
            return (
              <Dropdown.Option key={user.id} value={user.id}>
                {user.name}
              </Dropdown.Option>
            )
          })
        }
      </Dropdown>
    </Form.Field>
  )
}

export default AgentFilter
