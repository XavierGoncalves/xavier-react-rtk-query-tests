import React from 'react'
import {
  Avatar,
  Color,
  LoadingPlaceholder,
  Media
} from '@cobalt/cobalt-react-components'
import './contact-loading.component.scss'

const AVATAR_BACKGROUND_COLOR = Color.background.gray[300]

const ContactLoading = () => (
  <div className="contact-loading">
    <Media alignVerticalCenter>
      <Avatar backgroundColor={AVATAR_BACKGROUND_COLOR} small>
        &nbsp;
      </Avatar>
      <LoadingPlaceholder medium />
      <LoadingPlaceholder small />
    </Media>
  </div>
)

export default ContactLoading
