import { useAddToContacts } from '@contacts/creation-app-sdk'
import { PanelsLayout, Page } from '@cobalt/cobalt-react-components'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import { Link, useNavigate } from 'react-router-dom'
import ActivityHeader from 'activity-app/components/activity-header/ActivityHeader'
import ActivityToolbar from 'activity-app/components/activity-toolbar/ActivityToolbar'
import ActivityFiltersToolbar from 'activity-app/components/activity-filters-toolbar/activity-filters-toolbar'
import ActivityTable from 'activity-app/components/activity-table/ActivityTable.component'
import ActivityFooter from '../activity-footer/ActivityFooter.component'
import { ROOT_URL } from 'activity-app/constants/url.constants'
import useAppUrlParams from 'activity-app/hooks/use-app-url-params'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'
import { EditContactInput } from 'types'
import ActivityDetails from '../activity-details/activity-details.component'
import ActivityFilters from '../activity-filters/ActivityFilters.component'
import useGetHydratedActivities from 'activity-app/react-query/use-get-hydrated-activities'

const ActivityPage = () => {
    const atlasSdk = useAtlasSdk()
    const navigate = useNavigate()
    const { createUrl } = useCreateSearchParams()
    useGetHydratedActivities()
    const { open, visible, element } = useAddToContacts(
        process.env.REACT_APP_CONTACT_CREATION_APP_ID,
        atlasSdk
    )
    const { filtersVisible, selectedActivityId } = useAppUrlParams()

    const onEditContact = async ({ id, number }: EditContactInput) => {
        await open(number, id)
    }

    const onCloseFilters = () => {
        navigate(createUrl({
            filtersVisible: undefined
        }))
    }

    return (
        <PanelsLayout>
            <PanelsLayout.Content>
                <Link to={ROOT_URL}>
                    <button>HOME</button>
                </Link>
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
                            <ActivityTable />
                            <ActivityFooter />
                        </Page.Content>
                    </Page>
                </div>
            </PanelsLayout.Content>
            <PanelsLayout.Panel id="details-panel" active={Boolean(selectedActivityId)} over>
                <ActivityDetails onEditContact={onEditContact} />
            </PanelsLayout.Panel>
            <PanelsLayout.Panel
                id="filters-panel"
                small
                active={Boolean(filtersVisible)}
                overlay={Boolean(filtersVisible)}
                onClickOutside={() => onCloseFilters()}
                over
            >
                <ActivityFilters />
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
