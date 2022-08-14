import { Grid, Toolbar } from '@cobalt/cobalt-react-components'
import { CONTACTS_DELETE_POLICY, CONTACTS_UPDATE_POLICY } from 'constants/policies.constants';
import { usePolicy } from 'titanium/common/context/policies.context';
import DeleteButton from './delete-button/delete-button.component';
import EditButton from './edit-button/edit-button.component';

interface Props {
  contactId?: string;
  isLoading?: boolean;
  onDelete: (contactId: string) => void;
}

const ProfileToolbar = ({
  contactId,
  isLoading = false,
  onDelete,
}: Props) => {
  const canUpdateContact = usePolicy(CONTACTS_UPDATE_POLICY)
  const canDeleteContact = usePolicy(CONTACTS_DELETE_POLICY)
  return (
    <Toolbar>
      <Grid.Group horizontalGutters={Grid.Group.HALF_HORIZONTAL_GUTTERS}>
        <Grid.Column all="max" pushRight>
          {canUpdateContact && <EditButton id={contactId} isLoading={isLoading} />}
        </Grid.Column>
        {canDeleteContact && (
          <Grid.Column all="min" pushVCenter>
            <DeleteButton isLoading={isLoading} onDelete={onDelete} />
          </Grid.Column>
        )}
      </Grid.Group>
    </Toolbar>
  )
}

export default ProfileToolbar
