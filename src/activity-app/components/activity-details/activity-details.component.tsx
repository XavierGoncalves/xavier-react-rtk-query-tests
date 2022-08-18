import styled from 'styled-components'
import { NavHeader } from '@titanium/components'
import { useTranslation } from 'react-i18next'
import { PanelsLayout, Divider } from '@cobalt/cobalt-react-components'
import { RecordingPlayer } from '@titanium/recording-player'
import * as activityTypes from 'activity-app/constants/activity-types.constants'
import isDigitalInteraction from 'activity-app/utils/is-digital-interaction'
import UnknownSnapshot from './snapshot/unknown-snapshot.component'
import Snapshot from './snapshot/snapshot.component'
import useAppUrlParams from 'activity-app/hooks/use-app-url-params'
import { STOP } from 'activity-app/constants/playback.constants'
import { useSelectedActivity } from 'activity-app/react-query/use-get-activities'
import { useState } from 'react'
import { usePolicy } from 'titanium/common/context/policies.context'
import { RECORDINGS_LISTEN_POLICY } from 'contacts-app/constants/policies.constants'
import { onEditContactFn } from 'types'
import { useNavigate } from 'react-router-dom'
import useCreateSearchParams from 'activity-app/hooks/use-create-search-params'
import { useHttpClient } from 'titanium/common/context/http.context'

const Title = styled.h2`
  outline: 0;
`

interface Props {
  onEditContact: onEditContactFn;
}
const ActivityDetails = ({
  onEditContact,
}: Props) => {
  const [t] = useTranslation()
  const http = useHttpClient()
  const navigate = useNavigate()
  const { createUrl } = useCreateSearchParams()
  const canListenPermission = usePolicy(RECORDINGS_LISTEN_POLICY)
  const [playbackState, setPlayBackState] = useState(STOP)
  const { selectedActivityId: activityId } = useAppUrlParams()
  const { data: selectedActivity } = useSelectedActivity(activityId || '')
  const onPlaybackStateChange = (nextPlayBackState: string) => {
    setPlayBackState(nextPlayBackState)
  }
  const onClose = () => {
    navigate(createUrl({
      selectedActivityId: undefined,
    }))
  }
  const canDownload = true
  const recordingPlayerMessages = {
    unauthorized: t('details.recording.unauthorized'),
    deleted: t('details.recording.deleted'),
    error: {
      title: t('details.recording.error.title'),
      message: t('details.recording.error.message'),
      action: t('details.recording.error.action')
    },
    notfound: t('details.recording.notfound'),
    loading: t('details.recording.loading'),
    recording: number => t('details.recording.name', { number }),
    download: {
      text: t('details.recording.download.text'),
      filename: t('details.recording.download.filename')
    }
  }

  const { type, interactionId, id } = selectedActivity || { type: '' }
  const isDigitalInteractionFlag = isDigitalInteraction(type)
  const isMappedType = type in activityTypes
  const isUnknownType = type === null || !isMappedType
  console.log('ActivityDetails -> type->', type)
  console.log('ActivityDetails -> interactionId->', interactionId)
  console.log('ActivityDetails -> id->', id)
  if (!activityId) return null
  return (
    <>
      <NavHeader
        title={<Title tabIndex="0">{t('details.title')}</Title>}
        onClose={onClose}
        borderless
      ></NavHeader>
      <PanelsLayout.Content>
        {isUnknownType ? (
          <UnknownSnapshot />
        ) : (
          <Snapshot onEditContact={onEditContact} />
        )}
      </PanelsLayout.Content>
      <Divider noMargin />
      {!isDigitalInteractionFlag && !isUnknownType && (
        <div className="titanium">
          <RecordingPlayer
            key={id}
            interactionId={interactionId}
            hasPermission={canListenPermission}
            httpClient={http}
            messages={recordingPlayerMessages}
            playbackState={playbackState}
            onPlaybackStateChange={onPlaybackStateChange}
          >
            {canDownload && (
              <RecordingPlayer.DownloadBtn proxyUrl={process.env.PROXY_URL} />
            )}
          </RecordingPlayer>
        </div>
      )}
    </>
  )
}
export default ActivityDetails

