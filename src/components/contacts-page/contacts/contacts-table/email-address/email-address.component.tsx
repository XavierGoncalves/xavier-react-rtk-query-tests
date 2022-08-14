import CountChip from "components/common/count-chip/count-chip.component"
import ReadableEmail from "components/common/readable-email/readable-email.component"

interface Props {
  addresses: string[]
}

const EmailAddress = ({ addresses }: Props) => {
  const hasAddresses = addresses && addresses.length > 0
  const firstAddress = hasAddresses && addresses[0]

  return hasAddresses ? (
    <div style={{ display: 'flex' }}>
      <div style={{ minWidth: 0, alignSelf: 'center' }}>
        <ReadableEmail truncated value={firstAddress} />
      </div>
      <CountChip items={addresses} />
    </div>
  ) : null
}

export default EmailAddress
