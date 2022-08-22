import {
  H1,
  Icon,
  LabeledIcon,
  Link,
  LoadingPlaceholder
} from '@cobalt/cobalt-react-components'
import Box from '@cobalt/react-box'
import { Text } from '@cobalt/react-typography'
import { useTheme } from '@cobalt/react-theme-provider'
import { useTranslation } from 'react-i18next'
import { NavHeader, ReadableDate } from '@titanium/components'
import { TAB_ALL, TAB_ASSIGNED_TO_ME } from 'voicemails-app/constants/ui.constants'
import { ALL_VOICEMAILS_URL, ROOT_URL } from 'voicemails-app/constants/url.constants'
import useGetScopePermission from 'voicemails-app/hooks/use-get-scope-permission'
import { VOICEMAILS_SCOPE_AGENT } from 'contacts-app/constants/policies.constants'
import useGetVoicemails from 'voicemails-app/react-query/use-get-voicemails'
import useGetCurrentTab from 'voicemails-app/hooks/use-get-current-tab'
import { useNavigate } from 'react-router-dom'


const VoicemailsHeader = () => {
  const [t] = useTranslation()
  const theme = useTheme()
  const userScope = useGetScopePermission()
  console.log('userScope->', userScope)
  const currentTab = useGetCurrentTab()
  const navigate = useNavigate()

  const { data, isFetching, refetch } = useGetVoicemails()
  const lastUpdated = data?.lastUpdated
  const tabs = [
    {
      text: t('header.tabs.assignedToMe'),
      value: TAB_ASSIGNED_TO_ME
    },
    {
      text: t('header.tabs.all'),
      value: TAB_ALL
    }
  ]

  const onTabSelectedHandler = tab => {
    navigate(tab === TAB_ALL ? ALL_VOICEMAILS_URL : ROOT_URL)
  }

  return (
    <NavHeader
      style={{
        maxHeight: "20%"
      }}
      title={<H1 data-testid="voicemail-header__title">{t('header.title')}</H1>}
      selectedTab={currentTab}
      borderless
      onTabChange={onTabSelectedHandler}
      description={
        <>
          <Text color={theme.gray600}>{t('header.lastUpdated')}</Text>
          &nbsp;
          {isFetching ? (
            <LoadingPlaceholder tiny />
          ) : (
            <>
              <ReadableDate
                date={lastUpdated}
                locale="en"
                color={theme.gray600}
              />
              <Box paddingLeft={3}>
                <Link onClick={() => refetch()}>
                  <LabeledIcon
                    label={t('actions.refreshNow')}
                    name={Icon.CACHED}
                  />
                </Link>
              </Box>
            </>
          )}
        </>
      }
    >
      {/* <> */}
        {
          userScope !== VOICEMAILS_SCOPE_AGENT ?
          tabs.map(tab => (
            <NavHeader.Tab
              data-testid={`voicemail-header__${tab.text}-tab`}
              heading={tab.text}
              value={tab.value}
              key={tab.value}
            />
          )) : []
        }
      {/* </> */}
    </NavHeader>
  )
}

export default VoicemailsHeader
