import getDataProps from "activity-app/utils/get-data-props"
import { Table } from '@cobalt/cobalt-react-components'
import styled from 'styled-components'
import { QuickActions } from '@titanium/activity-details'
import Activity from "../../activity/Activity.component"
import { useGetActivities } from "activity-app/react-query/use-get-activities"
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import { usePolicies } from "titanium/common/context/policies.context"
import { useCurrentUserInstalledApps } from "titanium/common/context/user-installed-apps.context"
import { useProtocolsConfig } from "titanium/common/context/protocols-config.context"
import { useCurrentUser } from "titanium/common/context/user.context"
import useCreateSearchParams from "activity-app/hooks/use-create-search-params"
import { useNavigate } from "react-router-dom"

const ActivityWrapper = styled.div`
  h5 {
    display: inline-flex !important;
  }
`

const TableSmallRows = () => {
    const { selectedActivityId } = useAppUrlParams()
    const navigate = useNavigate()
    const userPolicies = usePolicies()
    const userInstalledApps = useCurrentUserInstalledApps()
    const protocolConfigList = useProtocolsConfig()
    const { id: userId } = useCurrentUser()
    const { createUrl } = useCreateSearchParams()
    const { data } = useGetActivities()
    const activities = data?.activities

    const onRowClick = (activityId: string) => {
        navigate(createUrl({ selectedActivityId: activityId }))
    }

    return (
        <>{
            activities && activities.map((activity, i) => {
                const onRowClickHandler = () => onRowClick(activity.id)

                const dataProps = getDataProps(i, activity, activities)

                return (
                    <Table.Row
                        {...dataProps}
                        key={activity.id}
                        data-testid={`activity-table__row-${activity.id}`}
                        active={activity.id === selectedActivityId}
                        onClick={onRowClickHandler}
                    >
                        <Table.Data truncated>
                            <ActivityWrapper>
                                <Activity
                                    type={activity.type}
                                    contact={activity.contact}
                                    date={activity.date}
                                />
                            </ActivityWrapper>
                        </Table.Data>
                        <Table.ActionData>
                            <QuickActions
                                activity={activity}
                                installedApps={userInstalledApps}
                                userId={userId}
                                userPolicies={userPolicies}
                                protocolConfigList={protocolConfigList}
                            ></QuickActions>
                        </Table.ActionData>
                    </Table.Row>
                )
            })
        }</>
    )
}


export default TableSmallRows
