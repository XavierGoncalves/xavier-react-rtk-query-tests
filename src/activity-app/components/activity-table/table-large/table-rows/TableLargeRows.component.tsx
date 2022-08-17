import { useTranslation } from "react-i18next"
import { QuickActions } from '@titanium/activity-details'
import { Duration, ReadableDate, RingGroupList } from '@titanium/components'
import Activity from '../../activity/Activity.component'
import styled from 'styled-components'
import { Table } from '@cobalt/cobalt-react-components'
import useAppUrlParams from "activity-app/hooks/use-app-url-params"
import isDigitalInteraction from "activity-app/utils/is-digital-interaction"
import isExternalActivity from "activity-app/utils/is-external-activity"
import { useGetActivities } from "activity-app/react-query/use-get-activities"
import Agent from "../../agent/Agent.component"
import getDataProps from "activity-app/utils/get-data-props"
import { usePolicies } from "titanium/common/context/policies.context"
import { useCurrentUser } from "titanium/common/context/user.context"
import { useAccountData } from "titanium/common/context/account.context"
import { useCurrentUserInstalledApps } from "titanium/common/context/user-installed-apps.context"
import { useProtocolsConfig } from "titanium/common/context/protocols-config.context"
import { useNavigate } from "react-router-dom"
import useCreateSearchParams from "activity-app/hooks/use-create-search-params"

const ActivityWrapper = styled.div`
  h5 {
    display: inline-flex !important;
  }
`

const TableLargeRows = () => {
    const { data } = useGetActivities()
    const navigate = useNavigate()
    const activities = data?.activities
    const { selectedActivityId } = useAppUrlParams()
    const [t] = useTranslation()
    const userPolicies = usePolicies()
    const { id: userId } = useCurrentUser()
    const { timezone } = useAccountData()
    const userInstalledApps = useCurrentUserInstalledApps()
    const protocolConfigList = useProtocolsConfig()
    const createUrl = useCreateSearchParams()

    const onRowClick = (activityId: string) => {
        navigate(createUrl({ selectedActivityId: activityId }))
    }

    return (<>
        {
            activities && activities.map((activity, i) => {
                const {
                    id,
                    type,
                    contact,
                    agent,
                    number,
                    date,
                    duration,
                    ringGroups
                } = activity

                const dataProps = getDataProps(i, activity, activities)

                const isDigitalInteractionFlag = isDigitalInteraction(type)
                const isExternalActivityFlag = isExternalActivity(type)

                const active = id === selectedActivityId

                return (
                    <Table.Row
                        {...dataProps}
                        key={id}
                        data-testid={`activity-table__row-${id}`}
                        active={active}
                        onClick={() => onRowClick(id)}
                    >
                        <Table.Data truncated>
                            <ActivityWrapper>
                                <Activity
                                    type={type}
                                    contact={contact}
                                />
                            </ActivityWrapper>
                        </Table.Data>
                        <Table.Data truncated>
                            <Agent agent={agent} number={number} />
                        </Table.Data>
                        <Table.Data>
                            <ReadableDate date={date} locale="en" timezone={timezone} />
                        </Table.Data>
                        <Table.Data>
                            {!isDigitalInteractionFlag && !isExternalActivityFlag && (
                                <Duration value={duration} locale="en" />
                            )}
                        </Table.Data>
                        <Table.Data>
                            <RingGroupList
                                ringGroups={ringGroups}
                                popupTitle={t('fields.ringGroups.popupTitle', {
                                    count: ringGroups.length
                                })}
                            />
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
        }
    </>)
}

export default TableLargeRows
