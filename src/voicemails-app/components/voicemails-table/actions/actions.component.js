import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Button, Icon, Tooltip } from '@cobalt/cobalt-react-components'
import { LinkButton } from '@cobalt/react-button'
import { ButtonGroup } from '@titanium/components'
import { useVoiceConversation } from '@titanium/hooks'
import { CurrentUserPropType } from '../../../types/user'
import {
  VOICEMAIL_OPEN,
  VOICEMAIL_RESOLVED
} from '../../../constants/state.types'
import * as permissions from '../../../utils/permissions'
import { isAddableContact } from '../../../utils/is-addable-contact'
import { AtlasContext } from '../../../context'

export const Actions = ({
  contact,
  contactPhoneNumber,
  currentUser,
  id,
  loading,
  numberOfVisibleButtons = 3,
  onAddContact,
  onAssignToClick,
  onChangeStatus,
  onPlayVoicemail,
  status,
  canCreateContact
}) => {
  const [t] = useTranslation()

  const atlasSdk = useContext(AtlasContext)
  const [hasConversationApp, triggerVoiceCall] = useVoiceConversation(atlasSdk)

  const handleClick = (e, handler, ...args) => {
    e.stopPropagation()
    handler.apply(undefined, args)
  }

  const onClickToCallHandler = e => {
    e.stopPropagation()
    if (hasConversationApp) {
      triggerVoiceCall(contactPhoneNumber, contact.id)
      e.preventDefault()
    }
  }

  return (
    <ButtonGroup
      maxVisibleButtons={numberOfVisibleButtons}
      tooltip={t('actions.more')}
      data-testid="voicemails-table__actions"
    >
      <ButtonGroup.Viewport
        large
        medium
        small
        visible={permissions.canListenVoicemail(currentUser)}
      >
        <Tooltip
          inverted
          key="play-tooltip"
          position={Tooltip.POSITION_LEFT_CENTER}
          text={t('actions.play')}
        >
          <Button
            aria-label={t('actions.play')}
            data-testid="play-button"
            onClick={e => handleClick(e, onPlayVoicemail, id)}
            small
          >
            <Icon name={Icon.PLAY} tiny />
          </Button>
        </Tooltip>
      </ButtonGroup.Viewport>

      <ButtonGroup.Viewport
        large
        medium
        small
        visible={permissions.canChangeVoicemailStatus(currentUser)}
      >
        {status === VOICEMAIL_OPEN ? (
          <Tooltip
            inverted
            key="status-tooltip--open"
            position={Tooltip.POSITION_LEFT_CENTER}
            text={t('actions.resolve')}
          >
            <Button
              aria-label={t('actions.resolve')}
              data-testid="status-button--open"
              disabled={loading}
              onClick={e =>
                handleClick(e, onChangeStatus, id, VOICEMAIL_RESOLVED)
              }
              small
            >
              <Icon name={Icon.DONE} tiny />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip
            inverted
            key="status-tooltip--resolved"
            position={Tooltip.POSITION_LEFT_CENTER}
            text={t('actions.reopen')}
          >
            <Button
              aria-label={t('actions.reopen')}
              data-testid="status-button--resolved"
              disabled={loading}
              onClick={e => handleClick(e, onChangeStatus, id, VOICEMAIL_OPEN)}
              small
            >
              <Icon name={Icon.BACKUP_RESTORE} tiny />
            </Button>
          </Tooltip>
        )}
      </ButtonGroup.Viewport>

      <ButtonGroup.Viewport
        visible={permissions.canAssignVoicemail(currentUser)}
        small
      >
        <Tooltip
          inverted
          key="assign-tooltip"
          position={Tooltip.POSITION_LEFT_CENTER}
          text={t('actions.assignTo')}
        >
          <Button
            aria-label={t('actions.assignTo')}
            data-testid="assign-button"
            onClick={e => handleClick(e, onAssignToClick, id)}
            small
          >
            <Icon name={Icon.ASSIGNMENT_IND} tiny />
          </Button>
        </Tooltip>
      </ButtonGroup.Viewport>

      <Tooltip
        inverted
        key="call-tooltip"
        position={Tooltip.POSITION_LEFT_CENTER}
        text={t('actions.dial')}
      >
        <LinkButton
          aria-label={t('actions.dial')}
          data-testid="call-button"
          href={`tel:${contactPhoneNumber}`}
          onClick={onClickToCallHandler}
          size="small"
          type="secondary"
        >
          <Icon name={Icon.CALL} tiny />
        </LinkButton>
      </Tooltip>

      {canCreateContact && (
        <ButtonGroup.Viewport
          large
          medium
          small
          visible={isAddableContact(contact)}
        >
          <Tooltip
            inverted
            key="add-to-contacts-tooltip"
            position={Tooltip.POSITION_LEFT_CENTER}
            text={t('actions.addToContacts')}
          >
            <Button
              aria-label={t('actions.addToContacts')}
              data-testid="add-to-contacts-button"
              onClick={e =>
                handleClick(e, onAddContact, {
                  id: contact.id,
                  number: contactPhoneNumber,
                  voicemailId: id
                })
              }
              small
            >
              <Icon name={Icon.PERSON_ADD} tiny />
            </Button>
          </Tooltip>
        </ButtonGroup.Viewport>
      )}
    </ButtonGroup>
  )
}

Actions.propTypes = {
  contact: PropTypes.object,
  contactPhoneNumber: PropTypes.string.isRequired,
  currentUser: CurrentUserPropType.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  numberOfVisibleButtons: PropTypes.number,
  onAddContact: PropTypes.func.isRequired,
  onAssignToClick: PropTypes.func,
  onChangeStatus: PropTypes.func.isRequired,
  onPlayVoicemail: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  canCreateContact: PropTypes.bool.isRequired
}
