import { useContext } from 'react'
import styled from 'styled-components'
import {
  Table,
  H5,
  LoadingPlaceholder,
  Viewport,
  Paragraph
} from '@cobalt/cobalt-react-components'

const WIDTHS_LARGE = {
  FIELD: Table.Data.WIDTH[30],
  VALUE: Table.Data.WIDTH[35],
  ACTIONS: Table.Data.WIDTH[35]
}

const WIDTHS_SMALL = {
  VALUE: Table.Data.WIDTH[60],
  ACTIONS: Table.Data.WIDTH[40]
}

const StyledTr = styled.tr`
  ${({ noBorder }) =>
    noBorder &&
    `
    border-top: 0 !important;
  `}
`

interface Props {
  actions?: string | JSX.Element;
  isLoading: boolean;
  label?: string;
  noBorder?: boolean;
  placeholderSize?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  value?: null | string | JSX.Element
}

export const ProfileRow = ({
  actions,
  isLoading = false,
  label = '',
  noBorder = false,
  placeholderSize = 'medium',
  value = ''
}: Props) => {
  const breakpoint = useContext(Viewport.Context)
  const WIDTHS = breakpoint === 'small' ? WIDTHS_SMALL : WIDTHS_LARGE

  const placeholderProps = { [placeholderSize]: true }

  return (
    <StyledTr noBorder={noBorder}>
      <Viewport large medium>
        <Table.Data
          alignment={Table.Data.ALIGNMENT.LEFT}
          width={WIDTHS}
          truncated
        >
          {isLoading ? (
            <LoadingPlaceholder {...placeholderProps} />
          ) : (
            label && <H5 truncated>{label}</H5>
          )}
        </Table.Data>
      </Viewport>
      <Table.Data width={WIDTHS.VALUE} truncated>
        {label && (
          <Viewport small>
            {isLoading ? (
              <LoadingPlaceholder {...placeholderProps} />
            ) : (
              <Paragraph microcopy truncated>
                {label}
              </Paragraph>
            )}
          </Viewport>
        )}
        {isLoading ? <LoadingPlaceholder {...placeholderProps} /> : value}
      </Table.Data>
      {actions ? (
        <Table.ActionData width={WIDTHS.ACTIONS}>{actions}</Table.ActionData>
      ) : (
        <Table.Data width={WIDTHS.ACTIONS} />
      )}
    </StyledTr>
  )
}

export default ProfileRow
