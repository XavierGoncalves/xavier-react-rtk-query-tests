import AtlasSdk from '@atlas/sdk';
import ThemeProvider from '@cobalt/react-theme-provider';
import ViewportProvider from '@cobalt/react-viewport-provider';
import { Navigate, Route, Routes, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { HttpClientProvider } from 'titanium/common/context/http.context';
import { AtlasSdkProvider } from 'titanium/common/context/atlas.context';
import { AccountDataProvider } from 'titanium/common/context/account.context';
import { PoliciesProvider } from 'titanium/common/context/policies.context';
import { CurrentUserProvider } from 'titanium/common/context/user.context';
import { CurrentUserInstalledAppsProvider } from 'titanium/common/context/user-installed-apps.context';
import ContactsPage from 'contacts-app/components/contacts-page/contacts-page.component';
import FavoritesPage from 'contacts-app/components/favorites/favorites-page.component';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'react-query/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CobaltRoot from '@cobalt/cobalt-react-components'
import DetailsPage from 'contacts-app/components/details-page/details-page.component';
import { CREATE_CONTACT_URL, EDIT_CONTACT_URL, ROOT_URL, VIEW_CONTACT_ACTIVITY_URL, VIEW_CONTACT_URL } from 'contacts-app/constants/url.constants';
import '../../styles.css';
import CreateContactPage from 'contacts-app/components/create-contact/CreateContactPage';
import EditContactPage from 'contacts-app/components/edit-contact/edit-contact-page.component';

const ContactsApp = (props) => {
  return (
    <ThemeProvider loader={() => AtlasSdk.theme.getConfig()}>
      <ViewportProvider>
        <CobaltRoot>
          <AtlasSdkProvider value={props?.atlasSdk}>
            <CurrentUserProvider value={props?.user}>
              <AccountDataProvider value={props?.account}>
                <PoliciesProvider value={props?.policies}>
                  <HttpClientProvider value={props?.http}>
                    <QueryClientProvider client={queryClient}>
                      <CurrentUserInstalledAppsProvider value={props?.userInstalledApps}>
                        <HistoryRouter history={props?.history}>
                          <Routes>
                            <Route path={ROOT_URL} element={<ContactsPage />} />
                            <Route
                              path={CREATE_CONTACT_URL}
                              element={<CreateContactPage />}
                            />
                            <Route
                              path={EDIT_CONTACT_URL}
                              element={<EditContactPage />}
                            />
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

export default ContactsApp
