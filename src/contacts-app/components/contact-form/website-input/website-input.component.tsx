import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form, Icon } from '@cobalt/cobalt-react-components'

const FieldWrapper = styled.div`
  .co-form__field {
    margin-top: 0;
  }
`

interface Props {
  label: string;
  placeholder: string;
  id: string;
  name: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
}

const WebsiteInput = ({
  error,
  id,
  label,
  name,
  onChange,
  placeholder,
  value
}: Props) => {
  const [website, setWebsite] = useState('')
  const [inputLabel, setInputLabel] = useState('http://')

  useEffect(() => {
    if (website) {
      onChange(inputLabel + website)
    } else {
      onChange('')
    }
  }, [website])

  useEffect(() => {
    if (value) {
      const [protocol] = value.match(/^https?:\/\//) || ['']

      if (protocol) {
        const parsedValue = value.replace(protocol, '')

        setInputLabel(protocol)
        setWebsite(parsedValue)
        onChange(value)
      } else {
        setWebsite(value)
        onChange(inputLabel + value)
      }
    } else {
      onChange(website)
    }
  }, [])

  const handleInputChange = ({ target: { value } }) => {
    setWebsite(value)
  }

  return (
    <Form.FieldStateless data-testid="website-field" error={!!error}>
      {label ? <Form.Label htmlFor={id}>{label}</Form.Label> : null}
      <FieldWrapper>
        <Form.FieldGroup id={'contact-form__website-form-field'}>
          <Form.InputGroup.TextLabel>{inputLabel}</Form.InputGroup.TextLabel>
          <input
            id={id}
            name={name}
            type="text"
            placeholder={placeholder}
            value={website}
            onChange={handleInputChange}
          />
        </Form.FieldGroup>
      </FieldWrapper>
      {error ? (
        <Form.Feedback>
          <Icon name={Icon.INFO_OUTLINE} tiny />
          {error}
        </Form.Feedback>
      ) : null}
    </Form.FieldStateless>
  )
}

export default WebsiteInput
