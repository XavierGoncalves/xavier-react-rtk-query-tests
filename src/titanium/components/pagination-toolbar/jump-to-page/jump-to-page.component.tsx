import { DropdownStateful } from '@cobalt/cobalt-react-components'
import { Text } from '@cobalt/react-typography'
import range from 'lodash/range'

interface Props {
  id: string;
  totalPages: number;
  value: number;
  onPageChange: (page: number) => void,
  jumpToLabel: string;
}

const JumpToPage = ({
  id,
  totalPages,
  value,
  onPageChange,
  jumpToLabel = 'Jump to:'
}: Props) => {
  const onPageChangeHandler = e => onPageChange(parseInt(e.target.value, 10))

  return (
    <>
      <div
        style={{
          margin: '0',
          whiteSpace: 'nowrap'
        }}
      >
        <Text inline>{jumpToLabel}&nbsp;</Text>
      </div>
      <DropdownStateful
        data-testid={id}
        id={id}
        borderless
        alignRight
        smallMenu
        upward
        onChange={onPageChangeHandler}
      >
        {range(1, totalPages + 1).map(item => (
          <DropdownStateful.Option
            key={item}
            selected={item === value}
            value={item.toString()}
          >
            {item}
          </DropdownStateful.Option>
        ))}
      </DropdownStateful>
    </>
  )
}

export default JumpToPage;
