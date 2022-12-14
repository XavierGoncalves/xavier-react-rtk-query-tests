import { Text, Paragraph } from '@cobalt/cobalt-react-components'
import { useFormattedPhoneNumber } from '@titanium/components'
import CountChip from 'contacts-app/components/common/count-chip/count-chip.component'

interface Props {
  numbers: string[];
  small?: boolean
}


const PhoneNumber = ({ numbers, small = false }: Props) => {
  const hasNumbers = numbers && numbers.length > 0
  const firstNumber = hasNumbers && numbers[0]
  const [formattedPhoneNumber] = useFormattedPhoneNumber(firstNumber)

  return hasNumbers ? (
    <div style={{ display: 'flex' }}>
      <div style={{ minWidth: 0, alignSelf: 'center' }}>
        {small ? (
          <Paragraph microcopy truncated>
            {formattedPhoneNumber}
          </Paragraph>
        ) : (
          <Text truncated>{formattedPhoneNumber}</Text>
        )}
      </div>
      <CountChip items={numbers} tiny={small} />
    </div>
  ) : null
}

export default PhoneNumber
