import { useContext, useEffect } from 'react'
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

    return (
        <PanelsLayout>
            <PanelsLayout.Content>
                <div
                    style={{ display: 'flex', height: '100%', flexDirection: 'column' }}
                >
                    <VoicemailsHeader />
                    <VoicemailsToolbar />
                    {/*<VoicemailFiltersToolbar />
                    {voicemailId && (
                        <VoicemailAssignModal
                            voicemailId={voicemailId}
                            currentUser={currentUser}
                            staticOptions={[
                                {
                                    id: currentUser.id,
                                    name: 'fields.assigned.currentUser'
                                },
                                {
                                    id: VALUE_FILTER_UNASSIGNED,
                                    name: 'fields.assigned.unassigned',
                                    hasBorderBottom: true
                                }
                            ]}
                            errorMessage={'fields.assigned.errorMessage'}
                            retryMessage={'fields.assigned.retryMessage'}
                            fetchSingle={fetchUser}
                            fetchMultiple={fetchUsers}
                        />
                    )} */}
                    {/* <Page>
                        <Page.Content>
                            <VoicemailTable onAddContact={onAddContact} />
                            <VoicemailFooter />
                        </Page.Content>
                    </Page> */}
                </div>
            </PanelsLayout.Content>
            {/* <PanelsLayout.Panel
                id="filters-panel"
                small
                active={filtersVisible}
                overlay={filtersVisible}
                onClickOutside={() => onCloseFilters()}
                over
            >
                <VoicemailFilters />
            </PanelsLayout.Panel>
            <PanelsLayout.Panel id="details-panel" active={detailsVisible} over>
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
