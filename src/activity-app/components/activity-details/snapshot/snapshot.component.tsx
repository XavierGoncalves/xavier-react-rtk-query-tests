import {
  Agent,
  Contact,
  CopyToClipboardButton,
  Duration,
  ReadableDate,
  RingGroupList,
  Via
} from '@titanium/components'
import { useTranslation } from 'react-i18next'
import {
  Icon,
  LabeledIcon,
  Paragraph,
  Table,
  Tooltip
} from '@cobalt/cobalt-react-components'
import Button, { LinkButton } from '@cobalt/react-button'
import { getActivityType } from '@titanium/activity-details'
import IvrList from 'activity-app/components/activity-details/snapshot/ivr-list/ivr-list.component'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import isDigitalInteraction from 'activity-app/utils/is-digital-interaction'
import isExternalActivity from 'activity-app/utils/is-external-activity'
import { usePolicy } from 'titanium/common/context/policies.context'
import { CONTACTS_UPDATE_POLICY } from 'contacts-app/constants/policies.constants'
import { onEditContactFn } from 'types'
import { useAccountData } from 'titanium/common/context/account.context'
import isEditableContact from 'activity-app/utils/is-editable-contact'
import useContactDetails from 'titanium/hooks/use-contact-details'
import { useVoiceConversation } from 'titanium/common/hooks/use-voice-conversation'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'
import { useNavigate } from 'react-router-dom'
import { useSelectedActivity } from 'activity-app/react-query/use-get-activities'
import useAppUrlParams from 'activity-app/hooks/use-app-url-params'

interface Props {
  onEditContact: onEditContactFn
}

const Snapshot = ({
  onEditContact,
}: Props) => {
  const atlasSdk = useAtlasSdk()
  const { selectedActivityId } = useAppUrlParams()
  const { timezone } = useAccountData()
  const navigate = useNavigate()
  const { data: activity } = useSelectedActivity(selectedActivityId || '')
  const { createUrl } = useCreateSearchParams()
  const canUpdateContact = usePolicy(CONTACTS_UPDATE_POLICY)
  const [hasContactsApp, triggerContactDetails] = useContactDetails(atlasSdk)
  const [hasConversationApp, triggerVoiceCall] = useVoiceConversation(atlasSdk)

  const [t] = useTranslation()

  const onClose = () => {
    navigate(createUrl({
      selectedActivityId: undefined,
    }))
  }

  if (!activity) return null

  const { contact, type } = activity
  const {
    deleted: contactDeleted,
    id: contactId,
    initials: contactInitials,
    name: contactName,
    number: contactNumber
  } = contact || {}

  const {
    color: activityColor,
    icon: activityIcon,
    name: activityName,
    detailsName
  } = getActivityType(activity.type || '')

  const onContactClickHandler = e => {
    e.preventDefault()
    if (hasContactsApp) {
      triggerContactDetails(contactId)
    }
    e.stopPropagation()
  }

  const onEditContactHandler = () => {
    onEditContact({ id: contactId || null, number: contactNumber || null })
    onClose()
  }

  const onClickToCallHandler = e => {
    e.stopPropagation()
    if (hasConversationApp) {
      triggerVoiceCall(contactNumber, contactId)
      e.preventDefault()
    }
  }

  const isDigitalInteractionFlag = isDigitalInteraction(type)
  const isExternalActivityFlag = isExternalActivity(type)

  return (
    <div
      className="details-panel__snapshot-table"
      data-testid="details-panel__snapshot-table"
    >
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Data alignment={Table.Data.ALIGNMENT.LEFT}>
              <Paragraph microcopy>{t('fields.activityType.label')}</Paragraph>
              <LabeledIcon
                color={activityColor}
                label={t(detailsName || activityName)}
                name={activityIcon}
              />
            </Table.Data>
            <Table.Data />
          </Table.Row>
          <Table.Row>
            <Table.Data alignment={Table.Data.ALIGNMENT.LEFT} truncated>
              <Paragraph microcopy>{t('fields.contact.label')}</Paragraph>
              <div style={{ marginTop: '3px' }}>
                <Contact
                  asLink={Boolean(
                    !contactDeleted && contactId && hasContactsApp
                  )}
                  id={contactId}
                  initials={contactInitials}
                  name={contactName}
                  phoneNumber={contactNumber}
                  onClick={onContactClickHandler}
                />
              </div>
            </Table.Data>
            <Table.ActionData>
              {isEditableContact(contact, canUpdateContact) ? (
                <Tooltip
                  inverted
                  position={Tooltip.POSITION_LEFT_CENTER}
                  text={t('actions.editContact')}
                >
                  <Button
                    aria-label={t('actions.editContact')}
                    onClick={onEditContactHandler}
                    variation="transparent"
                    type="secondary"
                  >
                    <Icon name={Icon.EDIT} />
                  </Button>
                </Tooltip>
              ) : null}
              <Tooltip
                inverted
                position={Tooltip.POSITION_LEFT_CENTER}
                text={t('actions.dial')}
              >
                <LinkButton
                  data-testid="snapshot-click-to-call-action"
                  aria-label={t('actions.dial')}
                  href={`tel:${contactNumber}`}
                  onClick={onClickToCallHandler}
                  type="secondary"
                >
                  <Icon name={Icon.CALL} />
                </LinkButton>
              </Tooltip>
            </Table.ActionData>
          </Table.Row>
          <Table.Row>
            <Table.Data alignment={Table.Data.ALIGNMENT.LEFT} truncated>
              <Paragraph microcopy>{t('fields.via.label')}</Paragraph>
              <Via
                friendlyName={activity.number.name}
                number={activity.number.number}
              />
            </Table.Data>
            <Table.Data />
          </Table.Row>
          <Table.Row>
            <Table.Data
              alignment={Table.Data.ALIGNMENT.LEFT}
              width={Table.Data.WIDTH[95]}
              truncated
            >
              <Paragraph microcopy> {t('fields.agent.label')}</Paragraph>
              <div style={{ marginTop: '3px' }}>
                <Agent
                  name={activity.agent.name || t('fields.agent.noAgent')}
                />
              </div>
            </Table.Data>
            <Table.Data />
          </Table.Row>
          <Table.Row>
            <Table.Data alignment={Table.Data.ALIGNMENT.LEFT}>
              <Paragraph microcopy>{t('fields.ringGroups.label')}</Paragraph>
              <RingGroupList
                ringGroups={activity.ringGroups}
                popupTitle={t('fields.ringGroups.popupTitle', {
                  count: activity.ringGroups.length
                })}
              />
            </Table.Data>
            <Table.Data />
          </Table.Row>
          <Table.Row>
            <Table.Data alignment={Table.Data.ALIGNMENT.LEFT}>
              <Paragraph microcopy>
                {t(
                  isDigitalInteractionFlag
                    ? 'fields.assigned.label'
                    : 'fields.date.label'
                )}
              </Paragraph>
              <ReadableDate
                date={activity.date}
                locale="en"
                timezone={timezone}
              />
            </Table.Data>
            <Table.Data />
          </Table.Row>
          {!isDigitalInteractionFlag && !isExternalActivityFlag && (
            <Table.Row>
              <Table.Data alignment={Table.Data.ALIGNMENT.LEFT}>
                <Paragraph microcopy>{t('fields.duration.label')}</Paragraph>
                <Duration value={activity.duration} locale="en" />
              </Table.Data>
              <Table.Data />
            </Table.Row>
          )}
          <Table.Row>
            {activity.ivr ? (
              <Table.Data alignment={Table.Data.ALIGNMENT.LEFT}>
                <IvrList title={t('fields.ivr.label')} ivrs={activity.ivr} />
              </Table.Data>
            ) : (
              <></>
            )}
          </Table.Row>
          <Table.Row>
            <Table.Data alignment={Table.Data.ALIGNMENT.LEFT}>
              <Paragraph microcopy>{t('fields.interactionId.label')}</Paragraph>
              {activity.interactionId}
            </Table.Data>
            <Table.ActionData>
              <CopyToClipboardButton text={activity.interactionId} />
            </Table.ActionData>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}
export default Snapshot;
