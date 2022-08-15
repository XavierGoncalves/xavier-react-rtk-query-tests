import AtlasSdk from '@atlas/sdk';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import { Route, Router, Redirect, Switch } from "react-router-dom";
import '../../styles.css';
import { HttpClientProvider } from 'titanium/common/context/http.context';
import { AtlasSdkProvider } from 'titanium/common/context/atlas.context';
import { AccountDataProvider } from 'titanium/common/context/account.context';
import { PoliciesProvider } from 'titanium/common/context/policies.context';
import { CurrentUserProvider } from 'titanium/common/context/user.context';
import { CurrentUserInstalledAppsProvider } from 'titanium/common/context/user-installed-apps.context';
import ContactsPage from 'components/contacts-page/contacts-page.component';
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
                        <Router history={app?.history}>
                          <Switch>
                            <Route exact path={ROOT_URL}>
                              <ContactsPage />
                            </Route>
                            {/* <Route path={[VIEW_CONTACT_URL, VIEW_CONTACT_ACTIVITY_URL]}>
                              <DetailsPage />
                            </Route> */}
                            <Route path="*">
                              <Redirect to="/" replace={true} />
                            </Route>
                          </Switch>
                        </Router>
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

export default App
