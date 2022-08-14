
import ProfileRow from '../profile-row/profile-row.component';
import DefaultAction from './default-action.component';

interface Props {
  actions?: ({value}) => JSX.Element;
  component: (({ value }) => JSX.Element);
  isLoading: boolean;
  items?: string[];
  label: string;
}

const MultiRow = ({
  actions = ({ value }) => <DefaultAction value={value} />,
  component = ({ value }) => <span>{value}</span>,
  isLoading = false,
  items = [],
  label
}: Props) => {
  const Actions = actions
  const Component = component

  const [first, ...rest] = items

  return (
    <>
      <ProfileRow
        actions={first && <Actions value={first} />}
        isLoading={isLoading}
        label={label}
        value={first && <Component value={first} />}
      />
      {rest.map(item => (
        <ProfileRow
          actions={<Actions value={item} />}
          isLoading={isLoading}
          key={item}
          noBorder
          value={<Component value={item} />}
        />
      ))}
    </>
  )
}

export default MultiRow
