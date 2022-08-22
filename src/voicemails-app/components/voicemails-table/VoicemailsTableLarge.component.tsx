import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Table, Viewport, Icon } from '@cobalt/cobalt-react-components'
import {
  Duration,
  Contact,
  ReadableDate,
  RingGroupList
} from '@titanium/components'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import useContactDetails from 'titanium/hooks/use-contact-details'
import useGetVoicemails from 'voicemails-app/react-query/use-get-voicemails'
import computeState from 'voicemails-app/utils/compute-state'
import { EMPTY_STATES, STATE_READY } from 'voicemails-app/constants/state-types.constants'
import fetchUserApi from 'voicemails-app/api/fetch-user.api'
import fetchUsersApi from 'activity-app/api/fetch-users.api'
import EmptyState from './empty-state/EmptyState.component'
import { useCurrentUser } from 'titanium/common/context/user.context'
import { VALUE_FILTER_UNASSIGNED } from 'voicemails-app/constants/ui.constants'
import useGetAssignedUsers from 'voicemails-app/react-query/use-get-assigned-users'
import { useAccountData } from 'titanium/common/context/account.context'
import useAppUrlParams from 'voicemails-app/hooks/use-search-params'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'voicemails-app/hooks/use-create-search-params'
import LoadingRow from './loading-row/LoadingRow.component'
import VoicemailStatus from '../common/voicemail-status/VoicemailStatus.component'
// import { VoicemailStatus } from '../common/voicemail-status'
// import { AssignedTo } from '../common/assigned-to'
// import { fetchUser, fetchUsers } from '../../gateways/api/usersGateway'
// import { Actions } from './actions'
// import { LoadingRow } from './loading-row'
// import { EmptyState } from './empty-state'


// {
//   currentUser: CurrentUserPropType.isRequired,
//   numberOfRows: PropTypes.number,
//   selectedVoicemailId: PropTypes.string,
//   status: PropTypes.oneOf(stateTypes.ALL_TABLE_STATES),
//   users: PropTypes.arrayOf(UserPropType),
//   voicemails: PropTypes.array.isRequired,
//   whiteLabel: PropTypes.bool.isRequired,
//   accountTimezone: PropTypes.string.isRequired,
//   onAddContact: PropTypes.func.isRequired,
//   onAssignToClick: PropTypes.func.isRequired,
//   onChangeAssignedTo: PropTypes.func.isRequired,
//   onChangeStatus: PropTypes.func.isRequired,
//   onOrderByClick: PropTypes.func.isRequired,
//   onPlayVoicemail: PropTypes.func.isRequired,
//   onRetryClick: PropTypes.func.isRequired,
//   onRowClick: PropTypes.func.isRequired
// }


const VoicemailsTableLarge = ({ onAddContact }) => {
  const [t] = useTranslation()
  const navigate = useNavigate()
  const { createUrl } = useCreateSearchParams()
  const { selectedVoicemailId } = useAppUrlParams()
  const { timezone } = useAccountData()
  const breakpoint = useContext(Viewport.Context)
  const currentUser = useCurrentUser()
  const atlasSdk = useAtlasSdk()
  const [hasContactsApp, triggerContactDetails] = useContactDetails(atlasSdk)
  const { data: voicemailsData, isFetching, isError, refetch } = useGetVoicemails()
  const { data: assignedUsersData } = useGetAssignedUsers()
  const total = voicemailsData?.totalCount || 0
  const voicemails = voicemailsData?.voicemails || []
  const status = computeState(isError, isFetching, 0, total)
  console.log('isEmptyStatus(status)->', isEmptyStatus(status))
  console.log('VoicemailsTableLarge - status->', status)
  const onRowClickHandler = (voicemailId: string) => {
    navigate(createUrl({
      selectedVoicemailId: voicemailId
    }))
  }

  return isEmptyStatus(status) ? (
    <EmptyState
      status={status}
      onRetryClick={() => refetch()}
      whiteLabel={true}
    />
  ) : (
    <Table selectable data-table="main">
      <Table.Head>
        <Table.Row>
          <Table.Header
            width={setColWidthByScreenSize(breakpoint, 5, 10)}
          >
            {isMediumSize(breakpoint) ? null : t('fields.status.label')}
          </Table.Header>
          <Table.Header width={setColWidthByScreenSize(breakpoint, 30, 15)}>
            {t('fields.contact.label')}
          </Table.Header>
          <Table.Header width={setColWidthByScreenSize(breakpoint, 20, 15)}>
            {t('fields.assigned.label')}
          </Table.Header>
          <Table.Header
            width={setColWidthByScreenSize(breakpoint, 20, 15)}
          >
            {t('fields.when.label')}
          </Table.Header>
          <Viewport large>
            <Table.Header
              width={Table.Data.WIDTH[10]}
            >
              {t('fields.duration.label')}
            </Table.Header>
            <Table.Header width={Table.Data.WIDTH[20]}>
              {t('fields.ringGroups.label')}
            </Table.Header>
          </Viewport>
          <Table.Header />
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {status === STATE_READY ? (
          <Rows
            onPlayVoicemail={() => { }}
            breakpoint={breakpoint}
            currentUser={currentUser}
            onAddContact={onAddContact}
            onAssignToClick={() => { }}
            onChangeAssignedTo={() => { }}
            onChangeStatus={() => { }}
            onRowClick={onRowClickHandler}
            selectedVoicemailId={selectedVoicemailId}
            users={assignedUsersData}
            voicemails={voicemails}
            accountTimezone={timezone}
            hasContactsApp={hasContactsApp}
            triggerContactDetails={triggerContactDetails}
          />
        ) : (
          <LoadingRows />
        )}
      </Table.Body>
    </Table>
  )
}

const Rows = ({
  breakpoint,
  currentUser,
  hasContactsApp,
  onAddContact,
  onAssignToClick,
  onChangeAssignedTo,
  onChangeStatus,
  onPlayVoicemail,
  onRowClick,
  selectedVoicemailId,
  triggerContactDetails,
  users = [],
  voicemails,
  accountTimezone
}) => {
  const [t] = useTranslation()

  return (
    <>
      {
        voicemails.map(voicemail => {
          const { contact, contactPhoneNumber } = voicemail || {}
          const { deleted, id, initials, name } = contact || {}

          const onContactClickHandler = e => {
            e.preventDefault()
            if (hasContactsApp) {
              triggerContactDetails(id)
            }
            e.stopPropagation()
          }

          const onRowClickHandler = () => onRowClick(voicemail.id)

          return (
            <Table.Row
              key={voicemail.id}
              active={voicemail.id === selectedVoicemailId}
              data-testid={`voicemails-table__row-${voicemail.id}`}
              onClick={onRowClickHandler}
            >
              <Table.Data>
                <VoicemailStatus
                  status={voicemail.status.value}
                  loading={voicemail.status.loading}
                />
              </Table.Data>
              <Table.Data truncated>
                <Contact
                  asLink={Boolean(!deleted && id && hasContactsApp)}
                  id={id}
                  initials={initials}
                  name={name}
                  phoneNumber={contactPhoneNumber}
                  onClick={onContactClickHandler}
                />
              </Table.Data>
              <Table.Data truncated>
                {/* <AssignedTo
          key={voicemail.id + voicemail.assignedTo + users.length}
          voicemailId={voicemail.id}
          currentUser={currentUser}
          assignedTo={voicemail.assignedTo}
          onChangeAssignedTo={onChangeAssignedTo}
          assignedToStatus={voicemail.assignedToStatus}
          borderless
          assignedUsers={users}
          dataTestId={'voicemails-table__assigned-to'}
          selectionPlaceholder={'fields.assigned.selectionPlaceholder'}
          searchPlaceholder={'fields.assigned.searchPlaceholder'}
          staticOptions={[
            {
              id: currentUser.id,
              name: 'fields.assigned.currentUser',
              icon: Icon.USER
            },
            {
              id: VALUE_FILTER_UNASSIGNED,
              name: 'fields.assigned.unassigned',
              hasBorderBottom: true
            }
          ]}
          refineSearchMessage={'fields.assigned.refineSearch'}
          errorMessage={'fields.assigned.errorMessage'}
          retryMessage={'fields.assigned.retryMessage'}
          typeMoreMessage={'fields.assigned.typeMore'}
          noResultsMessage={'fields.assigned.empty'}
          fetchSingle={fetchUserApi}
          fetchMultiple={fetchUsersApi}
          inTable
        /> */}
              </Table.Data>
              <Table.Data>
                <ReadableDate
                  date={voicemail.date}
                  timezone={accountTimezone}
                  locale="en"
                />
              </Table.Data>
              <Viewport large>
                <Table.Data>
                  <Duration value={voicemail.duration} locale="en" />
                </Table.Data>
                <Table.Data>
                  <RingGroupList
                    popupTitle={t('fields.ringGroups.dropdownTitle', {
                      total: voicemail.ringGroups.length
                    })}
                    ringGroups={voicemail.ringGroups}
                  />
                </Table.Data>
              </Viewport>
              <Table.ActionData>
                {/* <Actions
          contact={contact}
          contactPhoneNumber={contactPhoneNumber}
          currentUser={currentUser}
          id={voicemail.id}
          loading={voicemail.status.loading}
          numberOfVisibleButtons={isMediumSize(breakpoint) ? 2 : 3}
          status={voicemail.status.value}
          onAddContact={onAddContact}
          onAssignToClick={onAssignToClick}
          onChangeStatus={onChangeStatus}
          onPlayVoicemail={onPlayVoicemail}
        /> */}
              </Table.ActionData>
            </Table.Row>
          )
        })
      }
    </>
  )

}

const isMediumSize = viewportSize => viewportSize === 'medium'

const setColWidthByScreenSize = (breakpoint, mediumWidth, largeWidth) =>
  Table.Data.WIDTH[isMediumSize(breakpoint) ? mediumWidth : largeWidth]

const isEmptyStatus = status => EMPTY_STATES.indexOf(status) > -1

const LoadingRows = () =>
  <>{[...Array(10).keys()].map(i => <LoadingRow key={i} />)}</>

export default VoicemailsTableLarge
