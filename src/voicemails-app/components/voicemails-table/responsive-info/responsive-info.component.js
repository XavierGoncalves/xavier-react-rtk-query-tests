import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Color,
  H5,
  Icon,
  LabeledIcon,
  Link,
  Media,
  Paragraph,
  Text
} from '@cobalt/cobalt-react-components'
import { ReadableDate } from '@titanium/components'
import { useContactDetails } from '@titanium/hooks'
import './responsive-info.css'
import { UserPropType } from '../../../types/user'
import { AtlasContext } from '../../../context'

const BACKGROUND_COLOR = Color.background.primary[300]
const CONTENT_COLOR = Color.primary[600]

export const ResponsiveInfo = ({
  contact,
  contactPhoneNumber,
  date,
  assignedTo,
  currentUser,
  users,
  showAssignedTo = true,
  accountTimezone
}) => {
  const [t] = useTranslation()

  const atlasSdk = useContext(AtlasContext)
  const [hasContactsApp, triggerContactDetails] = useContactDetails(atlasSdk)
  const { deleted, id, initials, name } = contact || {}

  const onClickHandler = e => {
    e.preventDefault()
    if (hasContactsApp) {
      triggerContactDetails(id)
    }
    e.stopPropagation()
  }

  const title = name || contactPhoneNumber

  return (
    <Media alignVerticalCenter>
      <Avatar
        backgroundColor={BACKGROUND_COLOR}
        contentColor={CONTENT_COLOR}
        small
      >
        {initials || <Icon name={Icon.USER} />}
      </Avatar>
      <H5 title={title} truncated>
        {!deleted && id && hasContactsApp ? (
          <Link onClick={onClickHandler} truncated>
            {title}
          </Link>
        ) : (
          <Text truncated>{title}</Text>
        )}
      </H5>
      <ReadableDate
        date={date}
        timezone={accountTimezone}
        locale="en"
        microcopy
      />
      {showAssignedTo ? (
        <Paragraph truncated microcopy>
          {assignedTo === currentUser.id ? (
            <LabeledIcon
              label={t('fields.assigned.currentUser')}
              name={Icon.USER}
            />
          ) : (
            getUserNameById(assignedTo, users, t('fields.assigned.unassigned'))
          )}
        </Paragraph>
      ) : null}
    </Media>
  )
}

const getUserNameById = (id, users, unassignedLabel) => {
  const user = users.find(user => user.id === id)
  return user ? user.name : unassignedLabel
}

ResponsiveInfo.propTypes = {
  contact: PropTypes.object,
  contactPhoneNumber: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  assignedTo: PropTypes.string,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(UserPropType),
  showAssignedTo: PropTypes.bool,
  accountTimezone: PropTypes.string.isRequired
}
