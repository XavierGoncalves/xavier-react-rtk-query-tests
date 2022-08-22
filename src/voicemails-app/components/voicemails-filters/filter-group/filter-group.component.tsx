// import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import {
//   Button,
//   Grid,
//   Icon,
//   PanelsLayout
// } from '@cobalt/cobalt-react-components'
// import { DurationInput } from '@titanium/components'
// import { ActiveFiltersPropType } from '../../../types/filters'
// import { RingGroupPropType } from '../../../types/ringGroup'
// import { UserPropType } from '../../../types/user'
// import { TAB_ASSIGNED_TO_ME, TAB_ALL } from '../../../constants/tabs'
// import { defaultValues as defaultFilters } from '../../../constants/filters'
// import { AGENT } from '../../../constants/scope.types'
// import {
//   VALUE_FILTER_ALL,
//   VALUE_FILTER_UNASSIGNED
// } from '../../../constants/ui.constants'
// import { fetchUser, fetchUsers } from '../../../gateways/api/usersGateway'
// import { AssignedToFilter } from '../../common/assigned-to-filter'
// import { RingGroupFilter } from './ring-group-filter'
// import { WhenFilter } from './when-filter'
// import { StatusFilter } from './status-filter'
// import { ContactFilter } from './contact-filter'
// import { useCurrentUser } from 'titanium/common/context/user.context'
// import useGetCurrentTab from 'voicemails-app/hooks/use-get-current-tab'
// import useGetScopePermission from 'voicemails-app/hooks/use-get-scope-permission'

// // .propTypes = {
// //   activeFilters: ActiveFiltersPropType.isRequired,
// //   currentUser: UserPropType.isRequired,
// //   users: arrayOf(UserPropType),
// //   ringGroups: arrayOf(RingGroupPropType).isRequired,
// //   selectedTab: oneOf([TAB_ASSIGNED_TO_ME, TAB_ALL]).isRequired,
// //   onClose: func.isRequired,
// //   onApply: func.isRequired,
// //   onClear: func.isRequired,
// //   onRingGroupsFilterInit: func.isRequired,
// //   onRingGroupsSearch: func.isRequired,
// //   totalRingGroups: number.isRequired
// // }

// interface Props {
//   onClose: () => void;
// }
// export const FilterGroup = ({
//   onClose,
// }: Props) => {
//   const currentUser = useCurrentUser()
//   const currentTab = useGetCurrentTab()
//   const scope = useGetScopePermission()
//   const [t] = useTranslation()
//   //const [selectedFilters, setSelectedFilters] = useState(activeFilters)
//   const [isDisabled, setIsDisabled] = useState(false)
//   const [durationKey, setDurationKey] = useState(0)

//   //useEffect(() => setSelectedFilters(activeFilters), [activeFilters])

//   // const onApplyHandler = () => {
//   //   onApply(selectedFilters)
//   //   onClose()
//   // }

//   // const onClearHandler = () => {
//   //   setDurationKey(durationKey + 1)
//   //   onClear()
//   //   setSelectedFilters(defaultFilters)
//   // }

//   const isAssignedToColumnVisible =
//   currentTab !== TAB_ASSIGNED_TO_ME &&
//     scope !== AGENT

//   return (
//     <>
//       <PanelsLayout.Content>
//         <Grid fullWidth>
//           <Grid.Group>
//             <Grid.Column>
//               <Grid noPadding>
//                 <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
//                   <Grid.Column>
//                     <StatusFilter
//                       selectedStatus={selectedFilters.status}
//                       onChange={value =>
//                         setSelectedFilters({
//                           ...selectedFilters,
//                           status: value
//                         })
//                       }
//                     />
//                   </Grid.Column>
//                 </Grid.Group>
//                 <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
//                   <Grid.Column>
//                     <ContactFilter
//                       onChange={value =>
//                         setSelectedFilters({
//                           ...selectedFilters,
//                           contact: value
//                         })
//                       }
//                       selectedContact={selectedFilters.contact}
//                       borderless={false}
//                       dataTestId={'voicemail-filters__contact'}
//                       errorMessage={'fields.assigned.errorMessage'}
//                       retryMessage={'fields.assigned.retryMessage'}
//                       noResultsMessage={'fields.assigned.empty'}
//                     />
//                   </Grid.Column>
//                 </Grid.Group>
//                 {isAssignedToColumnVisible ? (
//                   <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
//                     <Grid.Column>
//                       <AssignedToFilter
//                         currentUser={currentUser}
//                         selectedUserId={selectedFilters.assignedUser.id}
//                         onChange={assignedUser =>
//                           setSelectedFilters({
//                             ...selectedFilters,
//                             assignedUser
//                           })
//                         }
//                         borderless={false}
//                         assignedUsers={users}
//                         dataTestId={'voicemail-filters__assigned-to'}
//                         staticOptions={[
//                           {
//                             id: VALUE_FILTER_ALL,
//                             name: 'fields.assigned.all'
//                           },
//                           {
//                             id: VALUE_FILTER_UNASSIGNED,
//                             name: 'fields.assigned.unassigned'
//                           },
//                           {
//                             id: currentUser.id,
//                             name: 'fields.assigned.currentUser',
//                             icon: Icon.USER,
//                             hasBorderBottom: true
//                           }
//                         ]}
//                         selectionPlaceholder={
//                           'fields.assigned.selectionPlaceholder'
//                         }
//                         searchPlaceholder={'fields.assigned.searchPlaceholder'}
//                         refineSearchMessage={'fields.assigned.refineSearch'}
//                         errorMessage={'fields.assigned.errorMessage'}
//                         retryMessage={'fields.assigned.retryMessage'}
//                         typeMoreMessage={'fields.assigned.typeMore'}
//                         noResultsMessage={'fields.assigned.empty'}
//                         fetchSingle={fetchUser}
//                         fetchMultiple={fetchUsers}
//                       />
//                     </Grid.Column>
//                   </Grid.Group>
//                 ) : null}
//                 <Grid.Group gutters={Grid.Group.HALF_GUTTERS}>
//                   <Grid.Column>
//                     <WhenFilter
//                       selectedWhen={selectedFilters.when}
//                       onChange={value =>
//                         setSelectedFilters({
//                           ...selectedFilters,
//                           when: value
//                         })
//                       }
//                     />
//                   </Grid.Column>
//                 </Grid.Group>
//                 <Grid.Group gutters={Grid.Group.HALF_GUTTERS} fullHeight>
//                   <Grid.Column>
//                     {/* <RingGroupFilter
//                       ringGroups={ringGroups}
//                       totalRingGroups={totalRingGroups}
//                       selectedRingGroups={selectedFilters.ringGroups}
//                       onChange={value =>
//                         setSelectedFilters({
//                           ...selectedFilters,
//                           ringGroups: value
//                         })
//                       }
//                       onRingGroupsSearch={onRingGroupsSearch}
//                       onRingGroupsFilterInit={onRingGroupsFilterInit}
//                     /> */}
//                   </Grid.Column>
//                 </Grid.Group>
//                 <Grid.Group gutters={Grid.Group.GUTTERS} fullHeight>
//                   <Grid.Column>
//                     <DurationInput
//                       id={'filter-group__duration-filter'}
//                       intervalValidationMsg={t(
//                         'fields.duration.intervalValidation'
//                       )}
//                       labels={{
//                         min: t('fields.duration.min'),
//                         max: t('fields.duration.max'),
//                         minutes: t('fields.duration.minutes'),
//                         seconds: t('fields.duration.seconds'),
//                         title: t('fields.duration.label')
//                       }}
//                       maxValidationMsg={t('fields.duration.maxValidation')}
//                       values={selectedFilters.duration}
//                       upward
//                       onChange={value =>
//                         setSelectedFilters({
//                           ...selectedFilters,
//                           duration: value
//                         })
//                       }
//                       onValidateForm={valid => setIsDisabled(!valid)}
//                       key={durationKey}
//                     />
//                   </Grid.Column>
//                 </Grid.Group>
//               </Grid>
//             </Grid.Column>
//           </Grid.Group>
//         </Grid>
//       </PanelsLayout.Content>
//       <Grid>
//         <Grid.Group gutters={Grid.Group.GUTTERS}>
//           <Grid.Column pushRight>
//             <Button secondary onClick={onClearHandler}>
//               <span data-testid="voicemails-filters__clear">
//                 {t('actions.clearFilters')}
//               </span>
//             </Button>
//             <Button primary onClick={onApplyHandler} disabled={isDisabled}>
//               <Icon name={Icon.CHECK} />
//               <span data-testid="voicemails-filters__apply">
//                 {t('actions.applyFilters')}
//               </span>
//             </Button>
//           </Grid.Column>
//         </Grid.Group>
//       </Grid>
//     </>
//   )
// }


const FilterGroup = () => <div>FilterGroup</div>
export default FilterGroup
