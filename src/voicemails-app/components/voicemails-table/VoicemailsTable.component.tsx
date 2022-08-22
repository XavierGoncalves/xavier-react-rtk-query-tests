import React, { useContext } from 'react'
import { Viewport } from '@cobalt/cobalt-react-components'
import VoicemailsTableLarge from './VoicemailsTableLarge.component'
//import { VoicemailTableSmall } from './voicemail-table-small.component'

const SMALL = 'small'

const VoicemailsTable = ({onAddContact}) => {
  const breakpoint = useContext(Viewport.Context)

  return breakpoint === SMALL ? (
    // <VoicemailTableSmall {...props} />
    <div>SMALL TABLE</div>
  ) : (
    <VoicemailsTableLarge onAddContact={onAddContact} />
  )
}

export default VoicemailsTable
