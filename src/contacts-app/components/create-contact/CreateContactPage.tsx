import styled from 'styled-components'
import { NavHeader } from '@titanium/components'
import {
    Button,
    H1,
    Page,
    Grid,
    Viewport,
    Footer
} from '@cobalt/cobalt-react-components'
import LinkButton from 'titanium/components/link-button/link-button.component'
import { ROOT_URL } from 'contacts-app/constants/url.constants'
import { usePolicy } from 'titanium/common/context/policies.context'
import { CONTACTS_CREATE_POLICY } from 'contacts-app/constants/policies.constants'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useHttpClient } from 'titanium/common/context/http.context'
import ContactForm from '../contact-form/ContactForm'

const FormWrapper = styled.div`
padding: 1.5rem 0;
`
const FooterWrapper = styled.div`
  .co-footer {
    padding: 0;
  }

  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

  .co-button {
    margin: 0.75rem 0.375rem !important;
  }
`

const FooterButtonsWrapper = styled.div`
  float: right;
  margin-right: 0.375rem;
`

const CreateContactPage = () => {
    const [t] = useTranslation()
    const http = useHttpClient()
    const [isFormValid, setIsFormValid] = useState(false)
    const canCreateContact = usePolicy(CONTACTS_CREATE_POLICY)
    const onSubmit = () => {}
    return (
        <>
            <NavHeader title={<H1>{t('pages.create.title')}</H1>}>
                <NavHeader.Action>
                    <Viewport medium large>
                        <LinkButton
                            data-testid="create-contact__cancel-button"
                            to={ROOT_URL}
                            asButton
                            secondary
                        >
                            {t('pages.create.actions.cancel')}
                        </LinkButton>
                    </Viewport>
                </NavHeader.Action>
                {canCreateContact && (
                    <NavHeader.Action>
                        <Viewport medium large>
                            <Button
                                data-testid="create-contact__save-button"
                                type="submit"
                                form="create-contact-page__contact-form"
                                primary
                                disabled={!isFormValid}
                            >
                                {t('pages.create.actions.submit')}
                            </Button>
                        </Viewport>
                    </NavHeader.Action>
                )}
            </NavHeader>
            <Page>
                <Page.Content>
                    <Grid fullWidth>
                        <Grid.Group>
                            <Grid.Column large="50" medium="50" small="100">
                                <FormWrapper>
                                    <ContactForm
                                        id="create-contact-page__contact-form"
                                        onSubmit={onSubmit}
                                        onValidationChange={setIsFormValid}
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
                            <LinkButton to={ROOT_URL} asButton secondary>
                                {t('pages.create.actions.cancel')}
                            </LinkButton>
                            <Button
                                type="submit"
                                form="create-contact-page__contact-form"
                                primary
                                disabled={!isFormValid}
                            >
                                {t('pages.create.actions.submit')}
                            </Button>
                        </FooterButtonsWrapper>
                    </Footer>
                </FooterWrapper>
            </Viewport>
        </>
    )
}

export default CreateContactPage
