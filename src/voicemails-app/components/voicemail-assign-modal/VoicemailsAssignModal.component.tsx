import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Flex from '@cobalt/react-flex'
import {
  Modal,
  Header,
  H2,
  ModalContent,
  List,
  Search,
  Icon,
  LabeledIcon,
  Loader
} from '@cobalt/cobalt-react-components'
import styled from 'styled-components'
import { VALUE_FILTER_UNASSIGNED } from '../../constants/ui.constants'
// import { ErrorMessage } from '../common/dropdown-error-message/ErrorMessage.component'
import { useCurrentUser } from 'titanium/common/context/user.context'
import useAppUrlParams from 'voicemails-app/hooks/use-search-params'
import { useHttpClient } from 'titanium/common/context/http.context'
import { useAgents } from 'voicemails-app/hooks/use-agents'
import { STATE_ERROR, STATE_LOADING, STATE_SUCCESS } from 'voicemails-app/constants/state-types.constants'
import useUpdateVoicemailMutation from 'voicemails-app/react-query/update-voicemail-mutation'
import fetchUserApi from 'voicemails-app/api/fetch-user.api'
import fetchUsersApi from 'voicemails-app/api/fetch-users-api'
import ErrorMessage from '../common/dropdown-error-message/ErrorMessage.component'

const RefineSearchMessage = styled.p.attrs({
  className: 'co--microcopy co--align-center'
})`
  padding: 0 0.5rem 1rem;
`

const errorMessage = 'fields.assigned.errorMessage'
const retryMessage = 'fields.assigned.retryMessage'

const VoicemailsAssignModal = ({
  voicemailId,
  onClose
}) => {
  const { updateVoicemailSync } = useUpdateVoicemailMutation()
  const http = useHttpClient()
  const [t] = useTranslation()
  const currentUser = useCurrentUser()
  const { assignedTo } = useAppUrlParams()
  const assignedToId = assignedTo.id
  const staticOptions = [
    {
      id: currentUser.id,
      name: 'fields.assigned.currentUser'
    },
    {
      id: VALUE_FILTER_UNASSIGNED,
      name: 'fields.assigned.unassigned',
      hasBorderBottom: true
    }
  ]
  const { id: currentUserId } = currentUser || { id: null }
  const [query, setQuery] = useState('')
  const [tryAgain, setTryAgain] = useState(0)

  useEffect(() => {
    setQuery('')
  }, [voicemailId, tryAgain])

  const {
    users,
    totalUsers,
    status,
    noResultsMsg,
    isQueryTooShort,
    error
  } = useAgents({
    http,
    query,
    selectedValue: assignedToId,
    currentUserId,
    tryAgain,
    typeMoreMessage: 'fields.assigned.typeMore',
    noResultsMessage: 'fields.assigned.empty',
    fetchSingle: fetchUserApi,
    fetchMultiple: fetchUsersApi,
    isOpen: true
  })

  const statusType = {
    [STATE_LOADING]: STATE_LOADING,
    [STATE_SUCCESS]: STATE_SUCCESS,
    [STATE_ERROR]: STATE_ERROR
  }

  const isLoading = status && statusType[status]
  const remaining = totalUsers - users.length
  const onCloseHandler = () => onClose()

  const onChangeAssignedToHandler = selectedId => {
    let user = users.find(({ id }) => id === selectedId) || {}

    if (selectedId === VALUE_FILTER_UNASSIGNED) {
      user = {
        id: null,
        name: t('fields.assigned.unassigned')
      }
    }
    if (selectedId === currentUserId) {
      user = currentUser
    }
    updateVoicemailSync({ voicemailId, userId: user.id })
    onClose()
  }

  const renderListContent = (id, name) => {
    if (id === currentUserId) {
      return (
        <List.Item.Content truncated>
          <LabeledIcon
            label={t('fields.assigned.currentUser')}
            name={Icon.USER}
          />
        </List.Item.Content>
      )
    }
    if ((!assignedToId && id === VALUE_FILTER_UNASSIGNED) || id === assignedToId) {
      return (
        <List.Item.Content truncated>
          <LabeledIcon label={name} name={Icon.CHECK} />
        </List.Item.Content>
      )
    }
    return <List.Item.Content truncated>{name}</List.Item.Content>
  }

  const renderOptions = () => {
    const mappedStaticOptions = staticOptions.map(item => ({
      ...item,
      name: t(item.name)
    }))

    const optionsArray = [...(query ? [] : mappedStaticOptions), ...users]

    if (users.length && !isQueryTooShort) {
      return (
        <>
          {optionsArray.map(({ id, name = null, hasBorderBottom = false }) => (
            <List.Item
              key={id}
              borderBottom={hasBorderBottom}
              active={
                id === assignedToId ||
                (!assignedToId && id === VALUE_FILTER_UNASSIGNED)
              }
              onClick={() => onChangeAssignedToHandler(id)}
            >
              {renderListContent(id, name)}
            </List.Item>
          ))}
          {totalUsers && remaining > 0 ? (
            <RefineSearchMessage>
              {t('fields.assigned.refineSearch', {
                remaining
              })}
            </RefineSearchMessage>
          ) : null}
        </>
      )
    }

    return (
      <div style={{ paddingTop: '0.75rem' }}>
        {noResultsMsg && t(noResultsMsg)}
      </div>
    )
  }

  return (
    <Modal visible onDismiss={onCloseHandler}>
      <Header contained>
        <Header.Heading>
          <Header.Title>
            <H2>{t('assignModal.title')}</H2>
          </Header.Title>
        </Header.Heading>
      </Header>
      <ModalContent>
        {error ? (
          <Flex alignX="center">
            <ErrorMessage
              onRetry={() => setTryAgain(tryAgain + 1)}
              errorMessage={t(errorMessage)}
              retryMessage={t(retryMessage)}
              dataPrefix={'voicemail-assign-modal'}
            />
          </Flex>
        ) : (
          <>
            <Search
              placeholder={t('assignModal.searchPlaceholder')}
              onSearch={query => setQuery(query.trim())}
              value={query}
            />
            {isLoading ? (
              <Loader large>{t('assignModal.loading')}</Loader>
            ) : (
              <div style={{ paddingTop: '0.75rem' }}>
                <List hoverRows>{renderOptions()}</List>
              </div>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default VoicemailsAssignModal
