import styled from 'styled-components'
import { Link } from '@cobalt/cobalt-react-components'

const addressToUri = (address: string): string => `mailto:${address}`

const LinkWrapper = styled.div`
  word-break: break-all;
`

interface Props {
  truncated?: boolean;
  value: string | false
}

export const ReadableEmail = ({ truncated = false, value }: Props) =>
  value ? (
    <LinkWrapper>
      <Link href={addressToUri(value)} target="_blank" truncated={truncated}>
        {value}
      </Link>
    </LinkWrapper>
  ) : null

export default ReadableEmail
