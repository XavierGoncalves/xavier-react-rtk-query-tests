import AtlasSdk from '@atlas/sdk';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
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
import ActivityPage from 'activity-app/components/activity-page/ActivityPage';
import { BrowserRouter, MemoryRouter, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ProtocolsConfigProvider } from 'titanium/common/context/protocols-config.context';
import './app.styles.scss'

const ActivityApp = (props) => {
    return (
        <ThemeProvider loader={() => AtlasSdk.theme.getConfig()}>
            <ViewportProvider>
                <CobaltRoot>
                    <AtlasSdkProvider value={props?.atlasSdk}>
                        <CurrentUserProvider value={props?.user}>
                            <AccountDataProvider value={props?.account}>
                                <PoliciesProvider value={props?.policies}>
                                    <HttpClientProvider value={props?.http}>
                                        <ProtocolsConfigProvider value={props?.protocolsConfig}>
                                            <QueryClientProvider client={queryClient}>
                                                <CurrentUserInstalledAppsProvider value={props?.userInstalledApps}>
                                                    <HistoryRouter history={props?.history}>
                                                        <ActivityPage />
                                                    </HistoryRouter>
                                                </CurrentUserInstalledAppsProvider>
                                                <ReactQueryDevtools initialIsOpen={false} />
                                            </QueryClientProvider>
                                        </ProtocolsConfigProvider>
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

export default ActivityApp
