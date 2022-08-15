import useGetContacts, { useInvalidateGetContacts } from "contacts-app/react-query/contacts.queries"
import { useTranslation } from 'react-i18next'
import {
    PanelsLayout,
    H1,
    Page,
    Icon,
    Viewport
} from '@cobalt/cobalt-react-components'
import { Wrapper } from "./contacts-page.styles"
import { NavHeader } from '@titanium/components'
import { usePolicy } from "titanium/common/context/policies.context"
import ContactsToolbar from "./contacts-toolbar/contacts-toolbar.component"
import Contacts from "./contacts/contacts.component"
import EmptyState from "./contacts/contacts-table/empty-state/empty-state.component"
import ContactDeleteModal from "contacts-app/components/contact-delete-modal/contact-delete-modal.component"
import { useState } from "react"
import useAppUrlParams from "contacts-app/hooks/use-search-params"
import { useNavigate } from "react-router-dom"
import useCreateSearchParams from "contacts-app/hooks/use-create-search-params"
import sortToQuery from "contacts-app/utils/sort-to-query"
import searchToQuery from "contacts-app/utils/search-to-query"
import paginationToQuery from "contacts-app/utils/pagination-to-query"
import computeState from "contacts-app/utils/compute-state"
import { CONTACTS_CREATE_POLICY } from "contacts-app/constants/policies.constants"
import { EMPTY_STATES } from "contacts-app/constants/state.constants"
import useGetAccountCustomFields from "contacts-app/react-query/custom-fields.queries"
import { CREATE_CONTACT_URL } from "contacts-app/constants/url.constants"
import LinkButton from "titanium/components/link-button/link-button.component"

const ContactsPage = () => {
    const [t] = useTranslation()
    const navigate = useNavigate()
    const createUrl = useCreateSearchParams()
    const { page, search, sort } = useAppUrlParams()
    const { data, isFetching, isError, isFetched } = useGetContacts()
    const canCreateContact = usePolicy(CONTACTS_CREATE_POLICY)
    const [contactDeleteModalOpen, setContactDeleteModalOpen] = useState(false)
    const closeContactDeleteModal = () => setContactDeleteModalOpen(false)
    const { contacts, count, total, totalPages } = data || {}
    const invalidateGetContactQueries = useInvalidateGetContacts()
    const [contactId, setContactId] = useState('')
    useGetAccountCustomFields()

    // const state = (isFetching, isError, isFetched, contacts): string => {
    //     return Number(total) > 0 ? states.READY : search ? states.NO_RESULTS : states.EMPTY
    // }
    const state = computeState(isError, isFetching, search, total)

    const onSearchContact = (search: string) => {
        const params = {
            ...searchToQuery(search)
        }

        navigate(createUrl(params))
    }

    const onSort = (field: string, direction: string) => {
        const params = {
            ...sortToQuery({ field, direction })
        }

        navigate(createUrl(params))
    }

    const onPageChange = (page: string) => {
        const params = {
            ...paginationToQuery({ page })
        }

        navigate(createUrl(params))
    }


    const onContactDelete = () => {

    }

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
                    </NavHeader>
                    <ContactsToolbar
                        total={total}
                        loading={isFetching}
                        sort={sort}
                        search={search}
                        onSort={onSort}
                        onSearchContact={onSearchContact}
                    />
                    <Page>
                        <ContactDeleteModal open={contactDeleteModalOpen} onClose={closeContactDeleteModal} contactId={contactId} />
                        <Page.Content>
                            {EMPTY_STATES.includes(state) ? (
                                <EmptyState status={state} onRetryClick={invalidateGetContactQueries} />
                            ) : (
                                <Contacts
                                    contacts={contacts}
                                    totalPages={totalPages}
                                    state={state}
                                    currentPage={page}
                                    sort={sort}
                                    onPageChange={onPageChange}
                                    onSortBy={onSort}
                                    onContactDelete={onContactDelete}
                                    setCurrentContact={setContactId}
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
