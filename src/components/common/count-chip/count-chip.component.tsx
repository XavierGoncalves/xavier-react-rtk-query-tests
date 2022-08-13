import { Chip } from '@cobalt/cobalt-react-components'

interface Props {
  items: string[];
  threshold?: number;
  tiny?: boolean
}

const CountChip = ({ items, threshold = 1, tiny = false }: Props) => {
  const { length } = items

  return length > threshold ? (
    <div style={{ marginLeft: '5px' }}>
      <Chip tiny={tiny} small={!tiny}>
        +{length - threshold}
      </Chip>
    </div>
  ) : null
}

export default CountChip
