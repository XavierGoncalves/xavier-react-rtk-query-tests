import { Form } from '@cobalt/cobalt-react-components'
import { ContactDropdown } from '@contacts/contact-dropdown'
import { useTranslation } from 'react-i18next'
import { useHttpClient } from 'titanium/common/context/http.context'

// {
//   onChange: func.isRequired,
//   selectedContact: shape({ id: string, label: string }).isRequired
// }
interface Props {
  onChange: ({ id, label }) => void;
  value: string;
}

const ContactFilter = ({ onChange, value }: Props) => {
  const [t] = useTranslation()
  const http = useHttpClient()

  return (
    <Form.FieldStateless id="filters__contact">
      <Form.Label htmlFor="filters__contact">
        {t('fields.contact.label')}
      </Form.Label>
      <ContactDropdown
        http={http}
        onChange={onChange}
        selectedContactId={value}
        includeAllOption
        t={t}
      />
    </Form.FieldStateless>
  )
}

export default ContactFilter
