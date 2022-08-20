import {
  LabeledIcon,
  Link,
  H1,
  LoadingPlaceholder,
  Icon
} from '@cobalt/cobalt-react-components'
import { NavHeader, ReadableDate } from '@titanium/components'
import { useTranslation } from 'react-i18next'
import Box from '@cobalt/react-box'
import { Text } from '@cobalt/react-typography'
import { useTheme } from '@cobalt/react-theme-provider'
import { useGetActivities } from 'activity-app/react-query/use-get-activities'
import useGetHydratedActivities from 'activity-app/react-query/use-get-hydrated-activities'

const ActivityHeader = () => {
  const [t] = useTranslation()
  const theme = useTheme()
  const {data, refetch, isFetching} = useGetHydratedActivities()
  const lastUpdated = data?.lastUpdated
  return (
    <NavHeader
      title={<H1>{t('header.title')}</H1>}
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
      borderless
    />
  )
}
export default ActivityHeader

