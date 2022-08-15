import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  Chip,
  ChipsGroup,
  Link,
  Table,
  Text
} from '@cobalt/cobalt-react-components'
import { PhoneNumber } from '@titanium/components'
import getValidUrl from 'contacts-app/utils/get-valid-url'
import { ContactCustomField } from 'types'
import ProfileRow from './profile-row/profile-row.component'
import MultiRow from './multi-row/multi-row.component'
import ClickToCall from 'contacts-app/components/common/click-to-call/click-to-call.component'
import DefaultAction from './multi-row/default-action.component'
import ReadableEmail from 'contacts-app/components/common/readable-email/readable-email.component'
import { Contact } from 'contacts-app/api/fetch-contacts.api'

const TableWrapper = styled.div`
  .co-table[data-table='details'] {
    tr:first-child {
      border-top: none;
    }
  }
`

const LinkWrapper = styled.div`
  word-break: break-all;
`

const ActionsWrapper = styled.div`
  a + button {
    margin-left: 4px !important;
  }
`

interface Props {
  contact?: Contact,
  isLoading: boolean;
  contactCustomFields: ContactCustomField[];
  customFieldsLoadingState: boolean;
}

export const ProfileTable = ({
  contact,
  isLoading = false,
  contactCustomFields,
  customFieldsLoadingState
}: Props) => {
  const [t] = useTranslation()

  const {
    id,
    address,
    company,
    emails,
    industry,
    name,
    phones,
    faxes,
    tags,
    title,
    websites
  } = contact || {}

  return (
    <TableWrapper>
      <Table data-table="details">
        <Table.Body>
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.name.label')}
            value={name && <Text>{name}</Text>}
          />
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.tags.label')}
            placeholderSize="large"
            value={
              tags && (
                <ChipsGroup
                  popupHeaderTitle={count =>
                    t('fields.tags.popupTitle', { count })
                  }
                  useLoadingPlaceholder={false}
                >
                  {tags.map(tag => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </ChipsGroup>
              )
            }
          />
          <MultiRow
            actions={({ value }) => (
              <ActionsWrapper>
                <ClickToCall id={id} phones={[value]} />
                <DefaultAction value={value} />
              </ActionsWrapper>
            )}
            isLoading={isLoading}
            items={phones}
            label={t('fields.number.label')}
            component={({ value }) => <PhoneNumber value={value} withFlag />}
          />
          <MultiRow
            isLoading={isLoading}
            items={emails}
            label={t('fields.email.label')}
            component={() => <ReadableEmail />}
          />
          <MultiRow
            isLoading={isLoading}
            items={faxes}
            label={t('fields.faxnumber.label')}
            component={({ value }) => <PhoneNumber value={value} withFlag />}
          />
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.jobTitle.label')}
            value={title && <Text>{title}</Text>}
          />
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.company.label')}
            value={company && <Text>{company}</Text>}
          />
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.industry.label')}
            value={industry && <Text>{industry}</Text>}
          />
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.website.label')}
            value={
              Boolean(websites && websites.length > 0 && websites[0]) ? (
                <LinkWrapper>
                  <Link href={getValidUrl(websites?.[0] || '')} target="_blank">
                    {getValidUrl((websites?.[0] ||''))}
                  </Link>
                </LinkWrapper>
              ) : null
            }
          />
          <ProfileRow
            isLoading={isLoading}
            label={t('fields.address.label')}
            placeholderSize="large"
            value={address && <Text>{address}</Text>}
          />
          {customFieldsLoadingState ? (
            <ProfileRow isLoading={true} placeholderSize="large" />
          ) : (
            contactCustomFields.map(({ key, value }) => (
              <ProfileRow
                key={key}
                isLoading={isLoading}
                label={key}
                placeholderSize="large"
                value={value && <Text>{value}</Text>}
              />
            ))
          )}
        </Table.Body>
      </Table>
    </TableWrapper>
  )
}

export default ProfileTable
