import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Icon,
  Tooltip,
  Viewport
} from '@cobalt/cobalt-react-components'
import { Link } from 'react-router-dom'
import { EDIT_CONTACT_URL } from 'contacts-app/constants/url.constants'
import LinkButton from 'titanium/components/link-button/link-button.component'

const EditButton = ({ id = '', isLoading }) => {
  const [t] = useTranslation()

  const props = {
    'data-testid': 'profile-toolbar__edit-button',
    disabled: isLoading,
    small: true
  }

  return (
    <>
      <Viewport large medium>
        <LinkButton
          {...props}
          to={EDIT_CONTACT_URL.replace(':contactId', id)}
          aria-label={t('pages.details.profile.actions.edit')}
        >
          <Icon name={Icon.EDIT} tiny />
          <span>{t('pages.details.profile.actions.edit')}</span>
        </LinkButton>
      </Viewport>
      <Viewport small>
        <Link
          to={EDIT_CONTACT_URL.replace(':contactId', id)}
          aria-label={t('pages.details.profile.actions.edit')}
        >
          <Tooltip inverted text={t('pages.details.profile.actions.edit')}>
            <Button {...props} asLink secondary>
              <Icon name={Icon.EDIT} tiny />
            </Button>
          </Tooltip>
        </Link>
      </Viewport>
    </>
  )
}

export default EditButton
