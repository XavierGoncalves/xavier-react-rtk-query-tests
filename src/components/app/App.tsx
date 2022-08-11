import AtlasSdk from '@atlas/sdk';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import Flex from '@cobalt/react-flex';
import Box from '@cobalt/react-box';
import Divider from '@cobalt/react-divider';
import Card from '@cobalt/react-card';
import Avatar from '@cobalt/react-avatar';
import { Heading, Text } from '@cobalt/react-typography';
import Spinner from '@cobalt/react-spinner';
import { useTranslation } from "react-i18next";
import Page from '../page/Page';
// import { useCurrentUser } from '../../hooks/hooks';

import '../../styles.css';
import { HttpClientProvider, useHttpClient } from 'titanium/common/context/http.context';
import { AtlasSdkProvider } from 'titanium/common/context/atlas.context';
import { AccountDataProvider } from 'titanium/common/context/account.context';
import { PoliciesProvider } from 'titanium/common/context/policies.context';
import { CurrentUserProvider, useCurrentUser } from 'titanium/common/context/user.context';
import { CurrentUserInstalledAppsProvider, useCurrentUserInstalledApps } from 'titanium/common/context/user-installed-apps.context';

const App = ({ atlasSdk, user, userInstalledApps, account, policies, http, history }) => {
  // console.log('----------------------------------------')
  // console.log('app render-account-', account)
  // console.log('app render-atlasSdk-', atlasSdk)
  // console.log('app render-history-', history)
  // console.log('app render-http-', http)
  // console.log('app render-user-', user)
  // console.log('app render-policies-', policies)
  // console.log('app render-userInstalledApps-', userInstalledApps)
  console.log('render app')
  return (
    <ThemeProvider loader={() => AtlasSdk.theme.getConfig()}>
      <ViewportProvider>
        {/* <AtlasSdkProvider value={atlasSdk}> */}
          <CurrentUserProvider value={user}>
            {/* <AccountDataProvider value={account}> */}
              {/* <PoliciesProvider value={policies}> */}
                <HttpClientProvider value={http}>
                  {/* <CurrentUserInstalledAppsProvider value={userInstalledApps}> */}
                    <AppContent />
                  {/* </CurrentUserInstalledAppsProvider> */}
                </HttpClientProvider>
              {/* </PoliciesProvider> */}
            {/* </AccountDataProvider> */}
          </CurrentUserProvider>
        {/* </AtlasSdkProvider> */}
      </ViewportProvider>
    </ThemeProvider>
  );
}


function AppContent() {
  // const httpClient = useHttpClient()
  const userInstalledApps = useCurrentUserInstalledApps()
  // const user = useCurrentUser();
  return (
    <Page>
      <AppHeader />
      <Page.Content>
        {/* {!user ? <Loading /> : <Content user={user} />} */}
      </Page.Content>
    </Page>
  );
}

function Loading() {
  return (
    <Flex alignX="center" alignY="center" grow width="100%">
      <Spinner size="large" />
    </Flex>
  );
}

function AppHeader() {
  const [t] = useTranslation();

  return (
    <>
      <Box padding={['3', '4', '6']} width="100%">
        <Heading level="1">
          {t('Connected to Atlas')}
        </Heading>
      </Box>
      <Divider />
    </>
  );
}

function Content({ user }) {
  return (
    <Box padding={['3', '4', '6']} width="100%">
      <Card>
        <Box padding={['3', '4', '6']}>
          <Flex direction="row" gap="2" alignY="center">
            <Avatar color="theme">
              <Heading level="6" asLevel="3">{getInitials(user.name)}</Heading>
            </Avatar>
            <Heading level="2">{user.name}</Heading >
          </Flex>
          <Box paddingTop={['3', '4', '6']}>
            <Text>{user.email}</Text>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

function getInitials(fullname) {
  return fullname.split(' ').map((n) => n[0]).join('');
}

export default App
