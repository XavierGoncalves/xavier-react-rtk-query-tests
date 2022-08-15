import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const sharedStyles = css`
  &.ti-link-button--default {
    color: var(--gray-800) !important;

    &:hover,
    &:focus,
    &:active,
    > i {
      color: var(--gray-800) !important;
    }
  }

  .ti-components .co-table .co-table__cell.co-table__column--actions &,
  .ti-components .co-table .co-table__head-cell.co-table__column--actions &,
  .ti-components .co-table td.co-table__column--actions &,
  .ti-components .co-table th.co-table__column--actions & {
    &.ti-link-button--default > i {
      color: var(--gray-800) !important;
    }
  }
`
export const LinkWrapper = styled.a`
  ${sharedStyles}
`

export const RouterLinkWrapper = styled(Link)`
  ${sharedStyles}
`
