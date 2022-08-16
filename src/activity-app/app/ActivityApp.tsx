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
import { MemoryRouter } from 'react-router-dom';

const ActivityApp = (app) => {
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
                                                <MemoryRouter>
                                                    <ActivityPage />
                                                </MemoryRouter>
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

export default ActivityApp
