import { Form } from '@cobalt/cobalt-react-components'
import { useTranslation } from 'react-i18next'
import { HttpContext } from '../../../../context'
import { VALUE_FILTER_ALL } from '../../../../constants/ui.constants'
import { ContactDropdown } from './contact-dropdown'

export const ContactFilter = ({ onChange, selectedContact }) => {
  const [t] = useTranslation()
  const http = useContext(HttpContext)

  return (
    <Form.FieldStateless id="filters__contact">
      <Form.Label htmlFor="filters__contact">
        {t('fields.contact.label')}
      </Form.Label>
      <ContactDropdown
        http={http}
        onChange={onChange}
        selectedContact={selectedContact}
        staticOptions={[
          {
            id: VALUE_FILTER_ALL,
            name: 'fields.assigned.all'
          }
        ]}
        t={t}
      />
    </Form.FieldStateless>
  )
}

ContactFilter.propTypes = {
  onChange: func.isRequired,
  selectedContact: shape({ id: string, label: string }).isRequired
}
