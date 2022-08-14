import useGetContacts, { useInvalidateGetContacts } from "react-query/contacts"
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
import { useNavigate } from "react-router-dom"
import useCreateSearchParams from "hooks/use-create-search-params"
import sortToQuery from "utils/sort-to-query"
import searchToQuery from "utils/search-to-query"
import * as states from 'constants/constants'
import paginationToQuery from "utils/pagination-to-query"

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


    // const state = (isFetching, isError, isFetched, contacts): string => {
    //     return Number(total) > 0 ? states.READY : search ? states.NO_RESULTS : states.EMPTY
    // }
    const state = Number(total) > 0 ? states.READY : search ? states.NO_RESULTS : states.EMPTY

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
                    />
                    <ContactsToolbar
                        total={total}
                        loading={isFetching}
                        sort={sort}
                        search={search}
                        onSort={onSort}
                        onSearchContact={onSearchContact}
                    />
                    <Page>
                        <ContactDeleteModal open={contactDeleteModalOpen} onClose={closeContactDeleteModal} />
                        <Page.Content>
                            {EMPTY_STATES.includes(state) ? (
                                <EmptyState status={state} onRetryClick={useInvalidateGetContacts} />
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
