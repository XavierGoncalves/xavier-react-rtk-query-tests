import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { NavHeader } from '@titanium/components'
import { H1, PanelsLayout } from '@cobalt/cobalt-react-components'
import { useParams, useMatch, useNavigate } from 'react-router-dom'
import { useTheme } from '@cobalt/react-theme-provider'
import { Text } from '@cobalt/react-typography'
import { useGetContactActivities } from '@contact-activities/contact-activities-sdk'
import { ROOT_URL, VIEW_CONTACT_ACTIVITY_URL, VIEW_CONTACT_URL } from 'contacts-app/constants/url.constants'
import { useAtlasSdk } from 'titanium/common/context/atlas.context'
import useAppUrlParams from 'contacts-app/hooks/use-search-params'
import computeState from 'contacts-app/utils/compute-state'
import { LOADING } from 'contacts-app/constants/state.constants'
import { ACTIVITY_TAB, PROFILE_TAB } from 'contacts-app/constants/tabs.constants'
import useGetAccountCustomFields from 'contacts-app/react-query/custom-fields.queries'
import mergeCustomFields from 'contacts-app/utils/merge-custom-fields'
import { ContactCustomField } from 'types'
import paginationToQuery from 'contacts-app/utils/pagination-to-query'
import useCreateSearchParams from 'contacts-app/hooks/use-create-search-params'
import ContactDeleteModal from 'contacts-app/components/contact-delete-modal/contact-delete-modal.component'
import getDescription from 'contacts-app/utils/get-description'
import getNavHeaderTitle from 'contacts-app/utils/get-navheader-title'
import Profile from './profile/profile.component'
import useGetContact from 'contacts-app/react-query/contact.queries'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const DetailsPage = () => {
  const [t] = useTranslation()
  const pageRef = useRef<string>("1")
  const createUrl = useCreateSearchParams()
  const [newContactCustomFields, setNewContactCustomFields] = useState<ContactCustomField[]>([])
  const [contactDeleteModalOpen, setContactDeleteModalOpen] = useState(false)
  const theme = useTheme()
  const { contactId } = useParams()
  const navigate = useNavigate()
  const { page: currentPage, selectedActivityId } = useAppUrlParams()
  const { data: contact, isFetching, isError } = useGetContact()
  const { data: customFieldsList, isFetching: customFieldsLoadingState } = useGetAccountCustomFields()
  const atlasSdk = useAtlasSdk()

  const closeContactDeleteModal = () => setContactDeleteModalOpen(false)
  const openContactDeleteModal = () => setContactDeleteModalOpen(true)
  const onDelete = () => openContactDeleteModal()

  const onBack = () => navigate(ROOT_URL)

  const onTabChange = (url: string) => navigate(url)

  const onPageChange = (page: string) => {
    const params = {
      ...paginationToQuery({ page })
    }
    pageRef.current = page
    navigate(createUrl(params))
  }

  const state = computeState(isError, isFetching)
  const onActivitySelected = (activityId?: string) => {
    const params = {
      ...paginationToQuery({ page: pageRef.current }),
      open: activityId
    }
    navigate(createUrl(params))
  }

  const handleSelectedActivity = selectedActivityId => {
    if (selectedActivityId === null) {
      onActivitySelected(undefined)
    } else {
      onActivitySelected(selectedActivityId)
    }
  }

  const { element, open, visible, close } = useGetContactActivities(
    process.env.REACT_APP_CONTACT_ACTIVITIES_APP_ID,
    atlasSdk,
    onPageChange,
    handleSelectedActivity
  )


  useEffect(() => {
    if (customFieldsList && contact) {
      setNewContactCustomFields(
        mergeCustomFields(customFieldsList, contact.customFields)
      )
    }
  }, [customFieldsList, contact])

  const selectedTab = useMatch(VIEW_CONTACT_ACTIVITY_URL)
    ? ACTIVITY_TAB
    : PROFILE_TAB

  useEffect(() => {
    async function togglePortal() {
      if (selectedTab === ACTIVITY_TAB && Boolean(contactId)) {
        console.log('togglePortal - called open - contactId-> ', contactId, '<-currentPage->', currentPage, '<-selectedActivityId->', selectedActivityId)
        try {
          await open(contactId, currentPage, selectedActivityId)

        } catch (error) {
          console.log('togglePortal- error-', error)
        }
      } else {
        close()
      }
    }
    togglePortal()
    // }, [selectedTab, contactId, currentPage, selectedActivityId])
  }, [selectedTab, contactId, currentPage, selectedActivityId])

  const onBackHandler = () => onBack()

  const onTabChangeHandler = tab => {
    const route =
      tab === PROFILE_TAB ? VIEW_CONTACT_URL : VIEW_CONTACT_ACTIVITY_URL
    if (contactId) {
      onTabChange(route.replace(':contactId', contactId))
    }
  }

  const isLoading = state === LOADING
  const { title, company, name, phones } = contact || {}

  const description = getDescription(title, company)
  const navHeaderTitle = getNavHeaderTitle(name, phones)

  return (
    <PanelsLayout>
      <PanelsLayout.Content>
        <ContactDeleteModal open={contactDeleteModalOpen} onClose={closeContactDeleteModal} />
        <Wrapper>
          <NavHeader
            borderless
            description={
              description && (
                <Text truncated color={theme.gray600}>
                  {t(description, { title, company })}
                </Text>
              )
            }
            isLoading={isLoading}
            onBack={onBackHandler}
            onTabChange={onTabChangeHandler}
            selectedTab={selectedTab}
            title={navHeaderTitle ? <H1 truncated>{navHeaderTitle}</H1> : ''}
            truncated
          >
            <NavHeader.Tab
              heading={t('pages.details.profile.title')}
              value={PROFILE_TAB}
            >
              <Profile
                contact={contact}
                contactCustomFields={newContactCustomFields}
                isLoading={isLoading}
                onDelete={onDelete}
                customFieldsLoadingState={customFieldsLoadingState}
              />
            </NavHeader.Tab>
            <NavHeader.Tab
              heading={t('pages.details.activity.title')}
              value={ACTIVITY_TAB}
            >
              {visible && <div
                data-testid="contact-activities-portal-app"
                style={{ display: 'flex', height: '100%', width: '100%' }}
                ref={element}
              ></div>}
              <div>
                <button onClick={() => {
                  if (currentPage === 1) {
                    handleSelectedActivity("01f375ca-0e4f-454f-ae4a-8fdfdc8eb4eb")
                  }
                  if (currentPage === 5) { handleSelectedActivity("ojGo-oABYiA00H7okNrh") }
                }}>OPEN SIDEPANEL</button>
                {Array.from(Array(5))
                  .map((_, i) => i + 1)
                  .map((item) => (
                    <button
                      key={`page-${item}`}
                      style={{
                        color: currentPage === item ? "red" : "blue"
                      }}
                      onClick={() => onPageChange(String(item))}
                    >
                      Page: {item}
                    </button>
                  ))}
              </div>
            </NavHeader.Tab>
          </NavHeader>
        </Wrapper>
      </PanelsLayout.Content>
    </PanelsLayout>
  )
}

export default DetailsPage;
