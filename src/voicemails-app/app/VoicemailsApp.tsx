import AtlasSdk from '@atlas/sdk';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import { Navigate, Route, Routes, unstable_HistoryRouter as Test } from "react-router-dom";
import { HttpClientProvider } from 'titanium/common/context/http.context';
import { AtlasSdkProvider } from 'titanium/common/context/atlas.context';
import { AccountDataProvider } from 'titanium/common/context/account.context';
import { PoliciesProvider } from 'titanium/common/context/policies.context';
import { CurrentUserProvider } from 'titanium/common/context/user.context';
import { CurrentUserInstalledAppsProvider } from 'titanium/common/context/user-installed-apps.context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'react-query/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CobaltRoot from '@cobalt/cobalt-react-components'
import '../../styles.css';
import VoicemailsHome from 'voicemails-app/components/home/VoicemailsHome.component';
import { ALL_VOICEMAILS_URL, ROOT_URL } from 'voicemails-app/constants/url.constants';
import VoicemailsAll from 'voicemails-app/components/all-voicemails/VoicemailsAll.component';

const VoicemailsApp = (app) => {
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
                        <Test history={app?.history}>
                          <Routes>
                            <Route path={ROOT_URL} element={<VoicemailsHome />} />
                            <Route
                              path={ALL_VOICEMAILS_URL}
                              element={<VoicemailsAll />}
                            />
                            <Route path="*" element={<Navigate to={ROOT_URL} replace={true} />} />
                          </ Routes>
                        </Test>
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

export default VoicemailsApp
