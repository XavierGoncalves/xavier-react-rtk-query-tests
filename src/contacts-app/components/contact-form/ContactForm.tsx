import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import {
  Divider,
  Form,
  Icon,
  LabeledIcon,
  Link
} from '@cobalt/cobalt-react-components'
import styled from 'styled-components'
import { MultiFormField, Input, PhoneNumberInput } from '@titanium/components'
import { getPhoneInfo } from '@talkdesk/phone-info'
import uniq from 'lodash/uniq'
import { ContactCustomField } from 'types'
import maxLength from 'contacts-app/utils/max-length'
import encodeCustomFieldKey from 'contacts-app/utils/encode-custom-field'
import useGetAccountCustomFields from 'contacts-app/react-query/custom-fields.queries'
import WebsiteInput from './website-input/website-input.component'
import LoadingForm from './loading-form/loading-form.component'

const FormWrapper = styled.div`
  .co-form > div {
    margin: 1rem 0 0;
  }

  .co-form > div:first-child {
    margin-top: 0;
  }

  .co-form > div.co-divider {
    margin: 1rem 0;
  }
`

const ExpandLinkWrapper = styled.div`
  text-align: center;
`

export const TEXT_INPUT_MAX_LENGTH = 256
const EMAIL_REGEX = /^(?!.{256})(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
const WEBSITE_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/i


interface DefaultValues {
    name: string;
    phoneNumber: string[];
    faxNumber: string[];
    email: string[];
    title: string,
    company: string,
    industry: string,
    website: string[];
    address: string,
    custom_fields: ContactCustomField[]
}

interface Props {
    collapsible?: boolean;
    id: string;
    isLoading?: boolean;
    defaultValues?: DefaultValues | {};
    maxMultiFields?: number;
    onSubmit: () => void;
    onValidationChange: Dispatch<SetStateAction<boolean>>;
  }

export const ContactForm = ({
  collapsible = false,
  defaultValues = {},
  id,
  isLoading,
  maxMultiFields = 5,
  onSubmit,
  onValidationChange,
}: Props) => {
  const [t] = useTranslation()
  const [isCollapsed, setCollapsed] = useState(collapsible)
  const [customFieldsMap, setCustomFieldsMap] = useState([])
  const {data: accountCustomFields}= useGetAccountCustomFields()

  const {
    handleSubmit,
    register,
    control,
    errors,
    formState,
    triggerValidation
  } = useForm({
    mode: 'onChange'
  })

  const { isValid } = formState

  const {
    name,
    phones,
    emails,
    faxes,
    title,
    company,
    industry,
    websites,
    address,
    customFields: customerCustomFields
  } = defaultValues

  useEffect(() => {
    if (!isValid) {
      triggerValidation()
    }
    onValidationChange(isValid)
  }, [isValid])

  useEffect(() => {
    const getCustomFieldsKeys = customFields =>
      customFields?.map(customField => customField?.key)?.filter(Boolean) || []
    setCustomFieldsMap(
      uniq([
        ...getCustomFieldsKeys(customerCustomFields),
        ...getCustomFieldsKeys(accountCustomFields)
      ])
    )
  }, [customerCustomFields, accountCustomFields])

  const submitProxy = data => {
    if (data?.custom_fields) {
      data.custom_fields = Object.keys(data.custom_fields).map(key => ({
        key: Buffer.from(key, 'base64').toString(),
        value: data.custom_fields[key]
      }))
    }

    onSubmit(data)
  }

  const getCustomFieldValue = key => {
    const matches = customerCustomFields?.filter(c => c.key === key)
    return matches?.length > 0 ? matches[0].value : null
  }

  const getCustomFieldError = key => {
    if (
      errors?.custom_fields &&
      Object.keys(errors.custom_fields).includes(key)
    ) {
      return errors?.custom_fields[key]?.message
    }
    return null
  }

  const defaultPhoneNumbers = phones || ['']
  const defaultEmails = emails || ['']
  const defaultFaxNumbers = faxes || ['']

  return (
    <FormWrapper>
      {isLoading ? (
        <LoadingForm collapsible={collapsible} />
      ) : (
        <Form onSubmit={handleSubmit(submitProxy)} noValidate id={id}>
          <Input
            id="name-input"
            name="name"
            type="text"
            label={t('fields.name.label')}
            value={name}
            required
            ref={register({
              required: t('fields.name.required'),
              ...maxLength(t('fields.name.maxLength'))
            })}
            error={errors.name && errors.name.message}
          />
          <MultiFormField
            maxItems={maxMultiFields}
            addMoreLabel={t('fields.number.addMore')}
            validationRules={{
              validate: phoneNumber => {
                const { isValid } = getPhoneInfo(phoneNumber)
                return !phoneNumber || isValid || t('fields.number.invalid')
              }
            }}
            errors={errors}
          >
            {defaultPhoneNumbers.map((phoneNumber, index) => (
              <Controller
                key={index}
                as={PhoneNumberInput}
                control={control}
                id={`phone-number-input-${index}`}
                name={'phones'}
                placeholder={null}
                label={index === 0 ? t('fields.number.label') : null}
                hint={index === 0 ? t('fields.number.minimum') : null}
                defaultValue={phoneNumber}
              />
            ))}
          </MultiFormField>
          <MultiFormField
            maxItems={maxMultiFields}
            addMoreLabel={t('fields.email.addMore')}
            register={register}
            validationRules={{
              pattern: {
                value: EMAIL_REGEX,
                message: t('fields.email.invalid')
              }
            }}
            errors={errors}
          >
            {defaultEmails.map((email, index) => (
              <Input
                key={index}
                id={`email-input-${index}`}
                type="email"
                name={'emails'}
                label={index === 0 ? t('fields.email.label') : null}
                value={email}
              />
            ))}
          </MultiFormField>
          <MultiFormField
            maxItems={maxMultiFields}
            addMoreLabel={t('fields.faxnumber.addMore')}
            validationRules={{
              validate: faxNumber => {
                const { isValid } = getPhoneInfo(faxNumber)
                return !faxNumber || isValid || t('fields.number.invalid')
              }
            }}
            errors={errors}
          >
            {defaultFaxNumbers.map((faxNumber, index) => (
              <Controller
                key={index}
                as={PhoneNumberInput}
                control={control}
                id={`fax-number-input-${index}`}
                name={'faxes'}
                placeholder={null}
                label={index === 0 ? t('fields.faxnumber.label') : null}
                defaultValue={faxNumber}
              />
            ))}
          </MultiFormField>
          {isCollapsed ? (
            <>
              <Divider />
              <ExpandLinkWrapper>
                <Link
                  aria-label={t('actions.showMoreFields')}
                  onClick={e => {
                    setCollapsed(false)
                    e.stopPropagation()
                  }}
                >
                  <LabeledIcon
                    name={Icon.EXPAND_MORE}
                    label={t('actions.showMoreFields')}
                  />
                </Link>
              </ExpandLinkWrapper>
            </>
          ) : (
            <>
              <Input
                id="title-input"
                name="title"
                type="text"
                label={t('fields.jobTitle.label')}
                value={title}
                ref={register(maxLength(t('fields.jobTitle.maxLength')))}
                error={errors.title && errors.title.message}
              />
              <Input
                id="company-input"
                name="company"
                type="text"
                label={t('fields.company.label')}
                value={company}
                ref={register(maxLength(t('fields.company.maxLength')))}
                error={errors.company && errors.company.message}
              />
              <Input
                id="industry-input"
                name="industry"
                type="text"
                label={t('fields.industry.label')}
                value={industry}
                ref={register(maxLength(t('fields.industry.maxLength')))}
                error={errors.industry && errors.industry.message}
              />
              <Controller
                as={WebsiteInput}
                control={control}
                id="website-input"
                name="websites[0]"
                label={t('fields.website.label')}
                defaultValue={websites && websites[0]}
                rules={{
                  pattern: {
                    value: WEBSITE_REGEX,
                    message: t('fields.website.invalid')
                  }
                }}
                error={errors.websites && errors.websites[0].message}
              />
              <Input
                id="address-input"
                name="address"
                type="text"
                label={t('fields.address.label')}
                value={address}
                ref={register(maxLength(t('fields.address.maxLength')))}
                error={errors.address && errors.address.message}
              />
              {customFieldsMap.map(
                customFieldKey =>
                  customFieldKey && (
                    <Input
                      type="text"
                      id={`custom-field-${encodeCustomFieldKey(
                        customFieldKey
                      )}`}
                      data-testid={`custom-field-${encodeCustomFieldKey(
                        customFieldKey
                      )}`}
                      key={encodeCustomFieldKey(customFieldKey)}
                      name={`custom_fields[${encodeCustomFieldKey(
                        customFieldKey
                      )}]`}
                      label={customFieldKey}
                      value={getCustomFieldValue(customFieldKey)}
                      error={getCustomFieldError(
                        encodeCustomFieldKey(customFieldKey)
                      )}
                      ref={register(maxLength(t('fields.custom.maxLength')))}
                    />
                  )
              )}
            </>
          )}
        </Form>
      )}
    </FormWrapper>
  )
}

export default ContactForm
