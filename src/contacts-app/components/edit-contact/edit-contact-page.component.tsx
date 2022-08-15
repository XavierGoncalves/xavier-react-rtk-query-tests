import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { NavHeader, LinkButton } from '@titanium/components'
import {
  Button,
  H1,
  Page,
  Grid,
  Viewport,
  Footer,
  Icon,
  Divider
} from '@cobalt/cobalt-react-components'
import isEmpty from 'lodash/isEmpty'
import omitBy from 'lodash/omitBy'
import { useParams, useLocation } from 'react-router-dom'
import ContactForm from '../contact-form/ContactForm'
import { CONTACTS_DELETE_POLICY, CONTACTS_UPDATE_POLICY } from 'contacts-app/constants/policies.constants'
import { usePolicy } from 'titanium/common/context/policies.context'
import { ROOT_URL, VIEW_CONTACT_URL } from 'contacts-app/constants/url.constants'
import ContactDeleteModal from '../contact-delete-modal/contact-delete-modal.component'
import { useDeleteContact, useGetContact, useUpdateContact } from 'contacts-app/react-query/contact.queries'

const FormWrapper = styled.div`
  padding: 1.5rem 0;
`

const FooterWrapper = styled.div`
  .co-footer {
    padding: 0;
  }

  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const FooterButtonsWrapper = styled.div`
  float: right;
  margin: 0.75rem !important;
  display: flex;
`

const EditContactPage = () => {
  const [contactDeleteModalOpen, setContactDeleteModalOpen] = useState(false)
  const canUpdateContact = usePolicy(CONTACTS_UPDATE_POLICY)
  const canDeleteContact = usePolicy(CONTACTS_DELETE_POLICY)
  const [isFormValid, setIsFormValid] = useState(false)
  const [t] = useTranslation()
  const closeContactDeleteModal = () => setContactDeleteModalOpen(false)
  const { contactId } = useParams()

  const query = new URLSearchParams(useLocation().search)
  const previousRoute = query.get('from')
    ? ROOT_URL
    : VIEW_CONTACT_URL.replace(':contactId', contactId || '')

  const { data: contact, isFetching } = useGetContact()
  const { updateContactSync, isLoading: isUpdateContactLoading } = useUpdateContact()
  const { deleteContactSync, isLoading: isDeleteContactLoading } = useDeleteContact()

  const onSubmitHandler = data => {
    updateContactSync({ id: contact?.id, ...data })
  }

  const onDeleteHandler = () => contact?.id && deleteContactSync(contact?.id)

  const isLoading = isFetching || isUpdateContactLoading || isDeleteContactLoading

  return (
    <>
      <NavHeader title={<H1>{t('pages.edit.title')}</H1>}>
        {canDeleteContact && (
          <NavHeader.Action>
            <Viewport medium large>
              <Button
                danger
                asLink
                onClick={onDeleteHandler}
                data-testid="header-action__delete"
                disabled={isLoading}
              >
                <Icon name={Icon.TRASH} />
                <span>{t('pages.edit.actions.delete')}</span>
              </Button>
              <Divider vertical />
            </Viewport>
          </NavHeader.Action>
        )}
        <NavHeader.Action>
          <Viewport medium large>
            <LinkButton
              to={previousRoute}
              disabled={isLoading}
              asButton
              secondary
            >
              {t('pages.edit.actions.cancel')}
            </LinkButton>
          </Viewport>
        </NavHeader.Action>
        {canUpdateContact && (
          <NavHeader.Action>
            <Viewport medium large>
              <Button
                type="submit"
                form="edit-contact-page__contact-form"
                primary
                data-testid="edit-contact__save-button"
                disabled={!isFormValid || isLoading}
              >
                {t('pages.edit.actions.submit')}
              </Button>
            </Viewport>
          </NavHeader.Action>
        )}
      </NavHeader>
      <Page>
        <ContactDeleteModal open={contactDeleteModalOpen} onClose={closeContactDeleteModal} contactId={contact?.id || ''} />
        <Page.Content>
          <Grid fullWidth>
            <Grid.Group>
              <Grid.Column large="50" medium="50" small="100">
                <FormWrapper>
                  <ContactForm
                    id="edit-contact-page__contact-form"
                    onSubmit={onSubmitHandler}
                    defaultValues={omitBy(contact, isEmpty)}
                    onValidationChange={setIsFormValid}
                    isLoading={isLoading}
                  />
                </FormWrapper>
              </Grid.Column>
            </Grid.Group>
          </Grid>
        </Page.Content>
      </Page>
      <Viewport small>
        <FooterWrapper>
          <Footer transparent pushCenter={false}>
            <FooterButtonsWrapper>
              {canDeleteContact && (
                <>
                  <Button
                    danger
                    asLink
                    onClick={onDeleteHandler}
                    data-testid="header-action__delete"
                    disabled={isLoading}
                  >
                    <Icon name={Icon.TRASH} />
                    <span>{t('pages.edit.actions.delete')}</span>
                  </Button>
                  <Divider vertical />
                </>
              )}
              <LinkButton
                to={previousRoute}
                disabled={isLoading}
                asButton
                secondary
              >
                {t('pages.edit.actions.cancel')}
              </LinkButton>
              {canUpdateContact && (
                <Button
                  type="submit"
                  form="edit-contact-page__contact-form"
                  data-testid="footer-action__save"
                  primary
                  disabled={!isFormValid || isLoading}
                >
                  {t('pages.edit.actions.submit')}
                </Button>
              )}
            </FooterButtonsWrapper>
          </Footer>
        </FooterWrapper>
      </Viewport>
    </>
  )
}

export default EditContactPage
