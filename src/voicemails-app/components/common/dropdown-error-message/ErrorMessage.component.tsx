import { Icon, Link, Color, Paragraph } from '@cobalt/cobalt-react-components'
import styled from 'styled-components'
import Flex from '@cobalt/react-flex'

const ErrorMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 6px;
`

const RetryLink = styled.span`
  text-decoration: underline;
  padding-left: ${({ inTable }) => (inTable ? '4' : '2')}px;
  margin-left: 0px !important;
`

const ErrorMessageContent = styled.span`
  padding-left: 4px;
  margin-left: 0 !important;
`

// {
//   onRetry: PropTypes.func,
//   errorMessage: PropTypes.string.isRequired,
//   retryMessage: PropTypes.string.isRequired,
//   dataPrefix: PropTypes.string.isRequired,
//   inTable: PropTypes.bool
// }

interface Props {
  onRetry: () => void;
  errorMessage: string;
  retryMessage: string;
  dataPrefix: string;
  inTable?: boolean;
}

const ErrorMessage = ({
  onRetry,
  errorMessage,
  retryMessage,
  dataPrefix,
  inTable = false
}: Props) => {
  const subMessage = inTable => (
    <>
      <div>
        <Paragraph microcopy color={Color.red[700]} truncated>
          <ErrorMessageContent data-testid={`${dataPrefix}-error-message`}>
            {errorMessage}
          </ErrorMessageContent>
        </Paragraph>
      </div>
      {onRetry && (
        <Link
          onClick={onRetry}
          data-testid={`${dataPrefix}-error-message__retry-link`}
        >
          <Paragraph microcopy color={Color.red[700]} truncated>
            <RetryLink inTable={inTable}>{retryMessage}</RetryLink>
          </Paragraph>
        </Link>
      )}
    </>
  )

  return (
    <ErrorMessageWrapper data-testid={`${dataPrefix}-error-wrapper`}>
      <Icon color={Color.red[700]} name="error_outline" />
      {inTable ? (
        <Flex direction="column" alignY="end">
          {subMessage(inTable)}
        </Flex>
      ) : (
        <>{subMessage(inTable)}</>
      )}
    </ErrorMessageWrapper>
  )
}

export default ErrorMessage
