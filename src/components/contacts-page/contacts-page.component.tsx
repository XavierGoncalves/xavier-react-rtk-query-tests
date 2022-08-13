import useContacts, { useContact } from "react-query/contacts"
import { useTranslation } from 'react-i18next'
import {
  PanelsLayout,
  H1,
  Page,
  Icon,
  Viewport
} from '@cobalt/cobalt-react-components'
import { Wrapper } from "./contacts-page.styles"
import { NavHeader } from "titanium/components/nav-header"
import { LinkButton } from "titanium/components/link-button"
import { CREATE_CONTACT_URL } from "constants/constants"

const ContactsPage = () => {
    const [t] = useTranslation()
    const {data, isFetching} = useContacts()
    return (
        <PanelsLayout>
          <PanelsLayout.Content>
            <Wrapper>
              <NavHeader
                title={<H1>{t('pages.index.title')}</H1>}
                borderless
                onTabChange={onTabChangeHandler}
                selectedTab={selectedTab}
                truncated
              >
                {shouldShowCreateContactButton() && (
                  <NavHeader.Action>
                    <LinkButton
                      data-testid="contacts__add-contact-button"
                      to={CREATE_CONTACT_URL}
                      asButton
                      primary
                    >
                      <Icon small name={Icon.PERSON_ADD} />
                      <Viewport small>
                        <span>{t('pages.index.actions.newSmall')}</span>
                      </Viewport>
                      <Viewport medium large>
                        <span>{t('pages.index.actions.new')}</span>
                      </Viewport>
                    </LinkButton>
                  </NavHeader.Action>
                )}
                </NavHeader>
              {/* No tabs, only render all contacts */}
              {renderAllContacts()}
            </Wrapper>
          </PanelsLayout.Content>
        </PanelsLayout>
      )
}

export default ContactsPage
