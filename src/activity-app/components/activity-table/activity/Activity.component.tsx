import {
  Avatar,
  Color,
  H5,
  Icon,
  LabeledIcon,
  Link,
  Media,
  Tooltip,
  Viewport,
  Text
} from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { ReadableDate, useFormattedPhoneNumber } from '@titanium/components'
import { getActivityType } from '@titanium/activity-details'
import isDigitalInteraction from 'activity-app/utils/is-digital-interaction'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import useContactDetails from 'titanium/hooks/use-contact-details'
import { useAccountData } from 'titanium/common/context/account.context'
import { ActivityContact } from 'types'

// {
//   contact: PropTypes.shape({
//     deleted: PropTypes.bool,
//     id: PropTypes.string,
//     name: PropTypes.string,
//     number: PropTypes.string.isRequired
//   }).isRequired,
//   date: PropTypes.string,
//   type: PropTypes.string.isRequired,
// }

interface Props {
  contact: ActivityContact
  date?: string;
  type: string;
}

const Activity = ({ contact, date, type }: Props) => {
  const { timezone } = useAccountData()
  const atlasSdk = useAtlasSdk()
  const [hasContactsApp, triggerContactDetails] = useContactDetails(atlasSdk)

  const [t] = useTranslation()

  const {
    color: activityColor,
    icon: activityIcon,
    name: activityName
  } = getActivityType(type)

  const {
    deleted: contactDeleted,
    id: contactId,
    name: contactName,
    number: contactNumber
  } = contact

  const onClickHandler = e => {
    e.preventDefault()
    if (hasContactsApp) {
      triggerContactDetails(contactId)
      e.stopPropagation()
    }
  }

  const [formattedPhoneNumber] = useFormattedPhoneNumber(contactNumber)

  const title = contactName || formattedPhoneNumber

  const isDigitalInteractionFlag = isDigitalInteraction(type)

  return (
    <Media alignVerticalCenter>
      <Avatar
        backgroundColor={Color.background.gray[200]}
        contentColor={activityColor}
        small
      >
        <Tooltip
          inverted
          position={Tooltip.POSITION_LEFT_TOP}
          text={t(activityName)}
        >
          <Icon name={activityIcon} />
        </Tooltip>
      </Avatar>
      <H5 title={title} truncated>
        {!contactDeleted && contactId && hasContactsApp ? (
          <Link onClick={onClickHandler} truncated>
            {title}
          </Link>
        ) : (
          title
        )}
      </H5>
      {date ? (
        <Viewport small>
          {isDigitalInteractionFlag ? (
            <ReadableDate
              date={date}
              locale="en"
              microcopy
              timezone={timezone}
              icon="textsms"
              iconLabelPrefix="SMS: "
            />
          ) : (
            <ReadableDate
              date={date}
              locale="en"
              microcopy
              timezone={timezone}
            />
          )}
        </Viewport>
      ) : null}
      {contactName && !isDigitalInteractionFlag ? (
        <Viewport large medium data-testid="activity-subtext">
          <Text microcopy truncated>
            {formattedPhoneNumber}
          </Text>
        </Viewport>
      ) : null}
      {isDigitalInteractionFlag ? (
        <Viewport large medium data-testid="activity-subtext">
          <Text microcopy truncated>
            <LabeledIcon
              name="textsms"
              label={contactName ? `SMS: ${formattedPhoneNumber}` : 'SMS'}
              color={Color.midnight[600]}
            />
          </Text>
        </Viewport>
      ) : null}
    </Media>
  )
}

export default Activity
