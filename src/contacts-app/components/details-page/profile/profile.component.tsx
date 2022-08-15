import React, { useState } from 'react'
import styled from 'styled-components'
import { Page, Grid, Viewport } from '@cobalt/cobalt-react-components'
import { Contact } from 'contacts-app/api/fetch-contacts.api'
import { ContactCustomField } from 'types'
import ProfileAvatar from './profile-avatar/profile-avatar.component'
import ContactDeleteModal from 'contacts-app/components/contact-delete-modal/contact-delete-modal.component'
import ProfileTable from './profile-table/profile-table.component'
import ProfileToolbar from './profile-toolbar/profile-toolbar.component'

const GridWrapper = styled.div`
  @media screen and (max-width: 640px) {
    margin-top: 0.75rem;
  }
  @media screen and (max-width: 960px) and (min-width: 641px) {
    margin-top: 1rem;
  }
  @media screen and (min-width: 961px) {
    margin-top: 1.5rem;
  }
`

interface Props {
  contact?: Contact;
  isLoading: boolean;
  onDelete: (contactId?: string) => void;
  contactCustomFields: ContactCustomField[];
  customFieldsLoadingState: boolean;
}

const Profile = ({
  contact,
  isLoading = false,
  onDelete,
  contactCustomFields = [],
  customFieldsLoadingState
}: Props) => {
  const { id, initials } = contact || {}
  const [contactDeleteModalOpen, setContactDeleteModalOpen] = useState(false)
  const closeContactDeleteModal = () => setContactDeleteModalOpen(false)
  const onDeleteHandler = () => onDelete(id)
  return (
    <>
      <ProfileToolbar
        contactId={id}
        isLoading={isLoading}
        onDelete={onDeleteHandler}
      />
      <Page>
        <ContactDeleteModal open={contactDeleteModalOpen} onClose={closeContactDeleteModal}/>
        <Page.Content>
          <GridWrapper>
            <Viewport small>
              <Grid fullWidth noPadding>
                <Grid.Group verticalGutters={Grid.Group.VERTICAL_GUTTERS}>
                  <Grid.Column all="max" pushCenter>
                    <ProfileAvatar initials={initials} />
                  </Grid.Column>
                </Grid.Group>
                <Grid.Group verticalGutters={Grid.Group.VERTICAL_GUTTERS}>
                  <Grid.Column all="max">
                    <ProfileTable
                      contact={contact}
                      isLoading={isLoading}
                      contactCustomFields={contactCustomFields}
                      customFieldsLoadingState={customFieldsLoadingState}
                    />
                  </Grid.Column>
                </Grid.Group>
              </Grid>
            </Viewport>
            <Viewport medium large>
              <Grid fullWidth>
                <Grid.Group horizontalGutters={Grid.Group.HORIZONTAL_GUTTERS}>
                  <Grid.Column all="min">
                    <ProfileAvatar initials={initials} />
                  </Grid.Column>
                  <Grid.Column all="max">
                    <ProfileTable
                      contact={contact}
                      isLoading={isLoading}
                      contactCustomFields={contactCustomFields}
                      customFieldsLoadingState={customFieldsLoadingState}
                    />
                  </Grid.Column>
                </Grid.Group>
              </Grid>
            </Viewport>
          </GridWrapper>
        </Page.Content>
      </Page>
    </>
  )
}

export default Profile
