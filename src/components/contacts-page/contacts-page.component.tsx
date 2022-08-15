import useGetContacts, { useInvalidateGetContacts } from "react-query/contacts.queries"
import { useTranslation } from 'react-i18next'
import {
    PanelsLayout,
    H1,
    Page,
} from '@cobalt/cobalt-react-components'
import { Wrapper } from "./contacts-page.styles"
import { NavHeader } from '@titanium/components'
import { usePolicy } from "titanium/common/context/policies.context"
import ContactsToolbar from "./contacts-toolbar/contacts-toolbar.component"
import Contacts from "./contacts/contacts.component"
import EmptyState from "./contacts/contacts-table/empty-state/empty-state.component"
import ContactDeleteModal from "components/contact-delete-modal/contact-delete-modal.component"
import { useState } from "react"
import useAppUrlParams from "hooks/use-search-params"
import { useHistory } from "react-router-dom"
import useCreateSearchParams from "hooks/use-create-search-params"
import sortToQuery from "utils/sort-to-query"
import searchToQuery from "utils/search-to-query"
import paginationToQuery from "utils/pagination-to-query"
import computeState from "utils/compute-state"
import { CONTACTS_CREATE_POLICY } from "constants/policies.constants"
import { EMPTY_STATES } from "constants/state.constants"
import useGetAccountCustomFields from "react-query/custom-fields.queries"

const ContactsPage = () => {
    const [t] = useTranslation()
    const { push } = useHistory()
    const createUrl = useCreateSearchParams()
    const { page, search, sort } = useAppUrlParams()
    const { data, isFetching, isError, isFetched } = useGetContacts()
    const canCreateContact = usePolicy(CONTACTS_CREATE_POLICY)
    const [contactDeleteModalOpen, setContactDeleteModalOpen] = useState(false)
    const closeContactDeleteModal = () => setContactDeleteModalOpen(false)
    const { contacts, count, total, totalPages } = data || {}
    const invalidateGetContactQueries = useInvalidateGetContacts()
    useGetAccountCustomFields()

    // const state = (isFetching, isError, isFetched, contacts): string => {
    //     return Number(total) > 0 ? states.READY : search ? states.NO_RESULTS : states.EMPTY
    // }
    const state = computeState(isError, isFetching, search, total)

    const onSearchContact = (search: string) => {
        const params = {
            ...searchToQuery(search)
        }
        const result = createUrl(params)
        console.log('onSearchContact-', result)
        push(result)
    }

    const onSort = (field: string, direction: string) => {
        const params = {
            ...sortToQuery({ field, direction })
        }
        const result = createUrl(params)
        console.log('onSort-', result)
        push(result)
    }

    const onPageChange = (page: string) => {
        const params = {
            ...paginationToQuery({ page })
        }
        const result = createUrl(params)
        console.log('onPageChange-', result)
        push(result)
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
