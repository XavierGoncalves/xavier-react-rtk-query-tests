import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Form, LoadingPlaceholder } from '@cobalt/cobalt-react-components'

const InputsWrapper = styled.div`
  .co-placeholder:not(.co--tiny) {
    height: 2.625rem;
  }

  .co--tiny {
    margin: 1rem 0 0;
  }
`

interface Props {
  collapsible?: Boolean;
}

const LoadingForm = ({ collapsible = false }: Props) => {
  const [t] = useTranslation()

  return (
    <Form>
      <InputsWrapper>
        <Form.FieldStateless>
          <Form.Label required>{t('fields.name.label')}</Form.Label>
          <LoadingPlaceholder />
        </Form.FieldStateless>
        <Form.FieldStateless>
          <Form.Label>{t('fields.number.label')}</Form.Label>
          <Form.Hint>{t('fields.number.minimum')}</Form.Hint>
          <LoadingPlaceholder />
          <LoadingPlaceholder tiny />
        </Form.FieldStateless>
        <Form.FieldStateless>
          <Form.Label>{t('fields.email.label')}</Form.Label>
          <LoadingPlaceholder />
          <LoadingPlaceholder tiny />
        </Form.FieldStateless>
        {!collapsible && (
          <>
            <Form.FieldStateless>
              <Form.Label>{t('fields.jobTitle.label')}</Form.Label>
              <LoadingPlaceholder />
            </Form.FieldStateless>
            <Form.FieldStateless>
              <Form.Label>{t('fields.company.label')}</Form.Label>
              <LoadingPlaceholder />
            </Form.FieldStateless>
            <Form.FieldStateless>
              <Form.Label>{t('fields.industry.label')}</Form.Label>
              <LoadingPlaceholder />
            </Form.FieldStateless>
            <Form.FieldStateless>
              <Form.Label>{t('fields.website.label')}</Form.Label>
              <LoadingPlaceholder />
            </Form.FieldStateless>
            <Form.FieldStateless>
              <Form.Label>{t('fields.address.label')}</Form.Label>
              <LoadingPlaceholder />
            </Form.FieldStateless>
          </>
        )}
      </InputsWrapper>
    </Form>
  )
}

export default LoadingForm 
