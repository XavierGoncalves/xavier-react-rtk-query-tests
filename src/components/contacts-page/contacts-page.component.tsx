import useContacts from "react-query/contacts"
import { useTranslation } from 'react-i18next'
import {
    PanelsLayout,
    H1,
    Page,
    Icon,
    Viewport
} from '@cobalt/cobalt-react-components'
import { Wrapper } from "./contacts-page.styles"
import { CONTACTS_CREATE_POLICY, CREATE_CONTACT_URL, EMPTY_STATES } from "constants/constants"
import { NavHeader, LinkButton } from '@titanium/components'
import { usePolicy } from "titanium/common/context/policies.context"
import ContactsToolbar from "./contacts-toolbar/contacts-toolbar.component"
import Contacts from "./contacts-toolbar/contacts/contacts.component"
import EmptyState from "./contacts-toolbar/contacts/contacts-table/empty-state/empty-state.component"
import ContactDeleteModal from "components/contact-delete-modal/contact-delete-modal.component"
import { useState } from "react"
import useAppUrlParams from "hooks/use-search-params"

const ContactsPage = () => {
    const [t] = useTranslation()
    const { page, search, sort } = useAppUrlParams()
    const { data, isFetching } = useContacts()
    const canCreateContact = usePolicy(CONTACTS_CREATE_POLICY)
    const [contactDeleteModalOpen, setContactDeleteModalOpen] = useState(false)
    const closeContactDeleteModal = () => setContactDeleteModalOpen(false)
    const { contacts, count, total, totalPages } = data || {}
    return (
        <PanelsLayout>
            <PanelsLayout.Content>
                <Wrapper>
                    <NavHeader
                        title={<H1>{t('pages.index.title')}</H1>}
                        borderless
                        // onTabChange={onTabChangeHandler}
                        // selectedTab={selectedTab}
                        truncated
                    >
                        {canCreateContact && (
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
                    <ContactsToolbar
                        total={total}
                        loading={isFetching}
                        sort={sort}
                        search={search}
                        onSortBy={onSortBy}
                        onSearchContact={onSearchContact}
                    />
                    <Page>
                        <ContactDeleteModal open={contactDeleteModalOpen} onClose={closeContactDeleteModal} />
                        <Page.Content>
                            {EMPTY_STATES.includes(state) ? (
                                <EmptyState status={state} onRetryClick={onInit} />
                            ) : (
                                <Contacts
                                    contacts={contacts}
                                    count={count}
                                    totalPages={totalPages}
                                    state={state}
                                    currentPage={page}
                                    sort={sort}
                                    onPageChange={onPageChange}
                                    onSortBy={onSortBy}
                                    onContactDelete={onContactDelete}
                                />
                            )}
                        </Page.Content>
                    </Page>
                </Wrapper>
            </PanelsLayout.Content>
        </PanelsLayout>
    )
}

export default ContactsPage
