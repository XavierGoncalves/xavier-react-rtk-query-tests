import React from 'react'
import PropTypes from 'prop-types'
import { Table } from '@cobalt/cobalt-react-components'
import { UserPropType, CurrentUserPropType } from '../../types/user'
import { TAB_ALL } from '../../constants/tabs'
import * as ui from '../../constants/ui.constants'
import * as stateTypes from '../../constants/state.types'
import { VoicemailStatus } from '../common/voicemail-status'
import { Actions } from './actions'
import { ResponsiveInfo } from './responsive-info'
import { LoadingRow } from './loading-row'
import { EmptyState } from './empty-state'

export const VoicemailTableSmall = ({
  numberOfRows = ui.DEFAULT_PAGE_SIZE,
  selectedTab,
  status = stateTypes.READY,
  whiteLabel,
  onRetryClick,
  ...props
}) =>
  isEmptyStatus(status) ? (
    <EmptyState
      status={status}
      onRetryClick={onRetryClick}
      whiteLabel={whiteLabel}
    />
  ) : (
    <Table selectable data-table="main">
      <Table.Body>
        {status === stateTypes.READY ? (
          <Rows selectedTab={selectedTab} {...props} />
        ) : (
          <LoadingRows numberOfRows={numberOfRows} />
        )}
      </Table.Body>
    </Table>
  )

const Rows = ({
  currentUser,
  selectedTab,
  selectedVoicemailId,
  users = [],
  voicemails,
  accountTimezone,
  onAddContact,
  onAssignToClick,
  onChangeStatus,
  onPlayVoicemail,
  onRowClick
}) =>
  voicemails.map(voicemail => {
    const onRowClickHandler = () => onRowClick(voicemail.id)

    return (
      <Table.Row
        key={voicemail.id}
        active={voicemail.id === selectedVoicemailId}
        data-testid={`voicemails-table__row-${voicemail.id}`}
        onClick={onRowClickHandler}
      >
        <Table.Data width={Table.Data.WIDTH[5]}>
          <VoicemailStatus
            status={voicemail.status.value}
            loading={voicemail.status.loading}
          />
        </Table.Data>
        <Table.Data truncated>
          <ResponsiveInfo
            contact={voicemail.contact}
            contactPhoneNumber={voicemail.contactPhoneNumber}
            date={voicemail.date}
            assignedTo={voicemail.assignedTo}
            currentUser={currentUser}
            users={users}
            showAssignedTo={selectedTab === TAB_ALL}
            accountTimezone={accountTimezone}
          />
        </Table.Data>
        <Table.ActionData>
          <Actions
            contact={voicemail.contact}
            currentUser={currentUser}
            contactPhoneNumber={voicemail.contactPhoneNumber}
            id={voicemail.id}
            loading={voicemail.status.loading}
            numberOfVisibleButtons={2}
            status={voicemail.status.value}
            onAddContact={onAddContact}
            onAssignToClick={onAssignToClick}
            onChangeStatus={onChangeStatus}
            onPlayVoicemail={onPlayVoicemail}
          />
        </Table.ActionData>
      </Table.Row>
    )
  })

const isEmptyStatus = status => stateTypes.EMPTY_STATES.indexOf(status) > -1

const LoadingRows = ({ numberOfRows }) =>
  [...Array(numberOfRows).keys()].map(i => <LoadingRow key={i} small />)

VoicemailTableSmall.propTypes = {
  currentUser: CurrentUserPropType.isRequired,
  numberOfRows: PropTypes.number,
  selectedTab: PropTypes.string.isRequired,
  selectedVoicemailId: PropTypes.string,
  status: PropTypes.oneOf(stateTypes.ALL_TABLE_STATES),
  users: PropTypes.arrayOf(UserPropType),
  voicemails: PropTypes.array.isRequired,
  whiteLabel: PropTypes.bool.isRequired,
  accountTimezone: PropTypes.string.isRequired,
  onAddContact: PropTypes.func.isRequired,
  onAssignToClick: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onPlayVoicemail: PropTypes.func.isRequired,
  onRetryClick: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired
}
