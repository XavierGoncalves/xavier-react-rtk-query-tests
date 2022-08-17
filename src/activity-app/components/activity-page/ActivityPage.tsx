import { useAddToContacts } from '@contacts/creation-app-sdk'
import { useState } from 'react'
import { PanelsLayout, Page } from '@cobalt/cobalt-react-components'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import { useLocation, useSearchParams } from 'react-router-dom'
import ActivityHeader from 'activity-app/components/activity-header/ActivityHeader'
import ActivityToolbar from 'activity-app/components/activity-toolbar/ActivityToolbar'
import ActivityFiltersToolbar from 'activity-app/components/activity-filters-toolbar/activity-filters-toolbar'
import ActivityTable from 'activity-app/components/activity-table/ActivityTable.component'

const ActivityPage = () => {
    // const location = useLocation()
    // const [search] = useSearchParams()
    const atlasSdk = useAtlasSdk()
    useGetActivities()
    const { open, visible, element } = useAddToContacts(
        process.env.CONTACT_CREATION_APP_ID,
        atlasSdk
    )
    const [detailsVisible, setDetailsVisible] = useState<boolean>(false)
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false)

    const onEditContact = async ({ id, number }) => {
        await open(number, id)
    }

    const onCloseFilters = () => { }

    return (
        <PanelsLayout>
            <PanelsLayout.Content>
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column'
                    }}
                >
                    <ActivityHeader />
                    <ActivityToolbar />
                    <ActivityFiltersToolbar />
                    <Page>
                        <Page.Content>
                            {/* <div>LOCATION--{JSON.stringify(location)}</div>
                            <div>SEARCH--{search}</div> */}
                            
                            <ActivityTable />
                            {/*<ActivityFooter /> */}
                        </Page.Content>
                    </Page>
                </div>
            </PanelsLayout.Content>
            <PanelsLayout.Panel id="details-panel" active={detailsVisible} over>
                {/* <ActivityDetails onEditContact={onEditContact} /> */}
            </PanelsLayout.Panel>
            <PanelsLayout.Panel
                id="filters-panel"
                small
                active={filtersVisible}
                overlay={filtersVisible}
                onClickOutside={() => onCloseFilters()}
                over
            >
                {/* <ActivityFilters onClose={onCloseFilters} /> */}
            </PanelsLayout.Panel>
            <PanelsLayout.Panel active={visible} id="contacts-panel" over>
                <div
                    ref={element}
                    style={{ display: 'flex', height: '100%', width: '100%' }}
                />
            </PanelsLayout.Panel>
        </PanelsLayout>
    )
}

export default ActivityPage
