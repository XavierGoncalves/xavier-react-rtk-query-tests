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
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import '../../styles.css';
import { HttpClientProvider, useHttpClient } from 'titanium/common/context/http.context';
import { AtlasSdkProvider, useAtlasSdk } from 'titanium/common/context/atlas.context';
import { AccountDataProvider, useAccountData } from 'titanium/common/context/account.context';
import { PoliciesProvider, usePolicies } from 'titanium/common/context/policies.context';
import { CurrentUserProvider, useCurrentUser } from 'titanium/common/context/user.context';
import { CurrentUserInstalledAppsProvider, useCurrentUserInstalledApps } from 'titanium/common/context/user-installed-apps.context';
import { useState } from 'react';
import ContactsPage from 'components/contacts-page/contacts-page.component';
import FavoritesPage from 'components/favorites/favorites-page.component';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'react-query/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CobaltRoot from '@cobalt/cobalt-react-components'
import DetailsPage from 'components/details-page/details-page.component';
import { ROOT_URL, VIEW_CONTACT_ACTIVITY_URL, VIEW_CONTACT_URL } from 'constants/url.constants';

const App = (app) => {
  return (
    <ThemeProvider loader={() => AtlasSdk.theme.getConfig()}>
      <ViewportProvider>
        <CobaltRoot>
          <AtlasSdkProvider value={app?.atlasSdk}>
            <CurrentUserProvider value={app?.user}>
              <AccountDataProvider value={app?.account}>
                <PoliciesProvider value={app?.policies}>
                  <HttpClientProvider value={app?.http}>
                    <QueryClientProvider client={queryClient}>
                      <CurrentUserInstalledAppsProvider value={app?.userInstalledApps}>
                        <HistoryRouter history={app?.history}>
                          <Routes>
                            <Route path={ROOT_URL} element={<ContactsPage />} />
                            <Route path={VIEW_CONTACT_ACTIVITY_URL} element={<DetailsPage />} />
                            <Route path={VIEW_CONTACT_URL} element={<DetailsPage />} />
                            <Route path="*" element={<Navigate to="/" replace={true} />} />
                          </ Routes>
                        </HistoryRouter>
                      </CurrentUserInstalledAppsProvider>
                      <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                  </HttpClientProvider>
                </PoliciesProvider>
              </AccountDataProvider>
            </CurrentUserProvider>
          </AtlasSdkProvider>
        </CobaltRoot>
      </ViewportProvider>
    </ThemeProvider>
  );
}


function AppContent() {
  console.log('render-AppContent')
  const httpClient = useHttpClient()
  const userInstalledApps = useCurrentUserInstalledApps()
  const user = useCurrentUser();
  const policies = usePolicies()
  const account = useAccountData()
  const altasSdk = useAtlasSdk()
  return (
    <Page>
      <AppHeader />
      <Page.Content>
        {!user ? <Loading /> : <Content user={user} />}
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

export function AppHeader() {
  const [t] = useTranslation();
  const [count, setCount] = useState(0)
  return (
    <>
      <Box padding={['3', '4', '6']} width="100%">
        <Heading level="1">
          {t('contains.plural', {
            count
          })}
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
