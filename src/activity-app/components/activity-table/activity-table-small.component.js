// import React from 'react'
// import styled from 'styled-components'
// import { Table } from '@cobalt/cobalt-react-components'
// import { QuickActions } from '@titanium/activity-details'
// import * as statusTypes from '../../constants/status.types'
// import { EmptyState } from './empty-state/'
// import { LoadingRow } from './loading-rows/loading-row'
// import { Activity } from './activity'
// import { getDataProps } from './get-data-props'

// const ActivityWrapper = styled.div`
//   h5 {
//     display: inline-flex !important;
//   }
// `

// const DEFAULT_PAGE_SIZE = 10


// export const ActivityTableSmall = ({
//   numberOfRows = DEFAULT_PAGE_SIZE,
//   onRetryClick,
//   status = statusTypes.STATUS_READY,
//   whiteLabel = false,
//   ...props
// }) =>
//   isEmptyStatus(status) ? (
//     <EmptyState
//       status={status}
//       onRetryClick={onRetryClick}
//       whiteLabel={whiteLabel}
//     />
//   ) : (
//     <Table sortable selectable data-table="main">
//       <Table.Body>
//         {status === statusTypes.STATUS_READY ? (
//           <ActivityTableRows {...props} />
//         ) : (
//           <LoadingRows numberOfRows={numberOfRows} />
//         )}
//       </Table.Body>
//     </Table>
//   )

// const isEmptyStatus = status =>
//   statusTypes.ALL_EMPTY_STATUS.indexOf(status) > -1

// const ActivityTableRows = ({
//   activeRowId,
//   activities,
//   accountTimezone,
//   onRowClick,
//   userId,
//   userPolicies,
//   userInstalledApps,
//   protocolConfigList
// }) =>
//   activities.map((activity, i) => {
//     const onRowClickHandler = () => onRowClick(activity.id)

//     const dataProps = getDataProps(i, activity, activities)

//     return (
//       <Table.Row
//         {...dataProps}
//         key={activity.id}
//         data-testid={`activity-table__row-${activity.id}`}
//         active={activity.id === activeRowId}
//         onClick={onRowClickHandler}
//       >
//         <Table.Data truncated>
//           <ActivityWrapper>
//             <Activity
//               type={activity.type}
//               contact={activity.contact}
//               date={activity.date}
//               accountTimezone={accountTimezone}
//             />
//           </ActivityWrapper>
//         </Table.Data>
//         <Table.ActionData>
//           <QuickActions
//             activity={activity}
//             installedApps={userInstalledApps}
//             userId={userId}
//             userPolicies={userPolicies}
//             protocolConfigList={protocolConfigList}
//           ></QuickActions>
//         </Table.ActionData>
//       </Table.Row>
//     )
//   })

// const LoadingRows = ({ numberOfRows }) =>
//   [...Array(numberOfRows).keys()].map(i => <LoadingRow key={i} small />)

// // ActivityTableSmall.propTypes = {
// //   activeRowId: PropTypes.string,
// //   activities: PropTypes.array.isRequired,
// //   numberOfRows: PropTypes.number,
// //   onRetryClick: PropTypes.func.isRequired,
// //   onRowClick: PropTypes.func,
// //   status: PropTypes.oneOf(statusTypes.ALL_STATUS),
// //   whiteLabel: PropTypes.bool,
// //   accountTimezone: PropTypes.string.isRequired
// // }
