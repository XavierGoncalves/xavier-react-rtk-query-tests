import {
  Media,
  Avatar,
  Color,
  Icon,
  H5,
  Paragraph
} from '@cobalt/cobalt-react-components'
import { VIEW_CONTACT_URL } from 'constants/url.constants'
import { Link } from 'react-router-dom'
import PhoneNumber from '../phone-number/phone-number.component'
import './contact.component.scss'

const AVATAR_BACKGROUND_COLOR = Color.background.primary[300]
const AVATAR_CONTENT_COLOR = Color.primary[600]

interface Props {
  name: string;
  id: string;
  initials: string;
  phoneNumbers: string[];
  faxNumbers: string[];
  title?: string | null;
  small?: boolean;
}

const Contact = ({
  name,
  id,
  initials,
  phoneNumbers,
  faxNumbers,
  title = null,
  small = false
}:Props) => {
  const displayName =
    name || (phoneNumbers && phoneNumbers[0]) || (faxNumbers && faxNumbers[0])
  const displayPhoneNumbers =
    small && name && phoneNumbers && phoneNumbers.length

  return (
    <Media alignVerticalCenter data-class="contact">
      <Avatar
        backgroundColor={AVATAR_BACKGROUND_COLOR}
        contentColor={AVATAR_CONTENT_COLOR}
        small
      >
        {initials || <Icon name={Icon.USER} />}
      </Avatar>
      <H5 title={displayName} truncated>
        <Link
          className="co--truncate"
          to={VIEW_CONTACT_URL.replace(':contactId', id)}
        >
          {displayName}
        </Link>
      </H5>
      {title ? (
        <Paragraph microcopy truncated>
          {title}
        </Paragraph>
      ) : displayPhoneNumbers ? (
        <PhoneNumber numbers={phoneNumbers} small />
      ) : null}
    </Media>
  )
}

export default Contact
