import { useContext, useEffect, useState } from 'react'
import { useAddToContacts } from '@contacts/creation-app-sdk'
import { Loader, Page, PanelsLayout } from '@cobalt/cobalt-react-components'
// import { VoicemailHeader } from '../voicemail-header'
// import { VoicemailToolbar } from '../voicemail-toolbar'
// import { VoicemailTable } from '../voicemail-table'
// import { VoicemailFiltersToolbar } from '../voicemail-filters-toolbar'
// import { VoicemailFooter } from '../voicemail-footer'
// import { VoicemailDetails } from '../voicemail-details'
// import { VoicemailFilters } from '../voicemail-filters'
// import { VoicemailAssignModal } from '../voicemail-assign-modal'
import './voicemails-page.component.css'

// import { fetchUser, fetchUsers } from '../../gateways/api/usersGateway'
import { VALUE_FILTER_UNASSIGNED } from '../../constants/ui.constants'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import VoicemailsHeader from '../voicemails-header/VoicemailsHeader.component'
import useGetVoicemails from 'voicemails-app/react-query/use-get-voicemails'
import VoicemailsToolbar from '../voicemail-toolbar/VoicemailsToolbar.component'
import VoicemailsFiltersToolbar from '../voicemails-filters-toolbar/VoicemailFiltersToolbar.component'
import useAppUrlParams from 'voicemails-app/hooks/use-search-params'
import VoicemailsAssignModal from '../voicemail-assign-modal/VoicemailsAssignModal.component'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'voicemails-app/hooks/use-create-search-params'
import VoicemailsFilters from '../voicemails-filters/VoicemailFilters.component'

// {
//     appLoaded: bool.isRequired,
//     activeFilters: ActiveFiltersPropType.isRequired,
//     page: number.isRequired,
//     filtersVisible: bool.isRequired,
//     detailsVisible: bool.isRequired,
//     onCloseFilters: func.isRequired,
//     onInit: func.isRequired,
//     onUpdateVoicemailContact: func.isRequired,
//     currentUser: CurrentUserPropType.isRequired,
//     voicemailId: string
//   }

const VoicemailsPage = () => {
    const [assignModalOpen, setAssignModalOpen] = useState(false)
    const navigate = useNavigate()
    const { createUrl } = useCreateSearchParams()
    const closeAssignModal = () => setAssignModalOpen(false)
    const { voicemailId, filtersVisible } = useAppUrlParams()
    useGetVoicemails()


    const atlasSdk = useAtlasSdk()
    const { open, visible, element } = useAddToContacts(
        process.env.CONTACT_CREATION_APP_ID,
        atlasSdk
    )

    const onAddContact = async ({ id, number, voicemailId }) => {
        const createdContact = await open(number, id)
        if (!id && createdContact) {
            // onUpdateVoicemailContact(voicemailId, createdContact.id)
        }
    }
    
    const onCloseHandler = () => {
      navigate(createUrl({
        filtersVisible: undefined
      }))
    }

    return (
        <PanelsLayout>
            <PanelsLayout.Content>
                <div
                    style={{ display: 'flex', height: '100%', flexDirection: 'column' }}
                >
                    <VoicemailsHeader />
                    <VoicemailsToolbar />
                    <VoicemailsFiltersToolbar />
                    {voicemailId && assignModalOpen && (
                        <VoicemailsAssignModal
                            voicemailId={voicemailId}
                            onClose={closeAssignModal}
                        />
                    )}
                    {/* <Page>
                        <Page.Content>
                            <VoicemailTable onAddContact={onAddContact} />
                            <VoicemailFooter />
                        </Page.Content>
                    </Page> */}
                </div>
            </PanelsLayout.Content>
            <PanelsLayout.Panel
                id="filters-panel"
                small
                active={filtersVisible}
                overlay={filtersVisible}
                onClickOutside={() => onCloseHandler()}
                over
            >
                <VoicemailsFilters onClose={onCloseHandler} />
            </PanelsLayout.Panel>
            {/* <PanelsLayout.Panel id="details-panel" active={detailsVisible} over>
                <VoicemailDetails onAddContact={onAddContact} />
            </PanelsLayout.Panel> */}
            <PanelsLayout.Panel id="contacts-panel" active={visible} over>
                <div
                    ref={element}
                    style={{ display: 'flex', height: '100%', width: '100%' }}
                ></div>
            </PanelsLayout.Panel>
        </PanelsLayout>
    )
}

export default VoicemailsPage
