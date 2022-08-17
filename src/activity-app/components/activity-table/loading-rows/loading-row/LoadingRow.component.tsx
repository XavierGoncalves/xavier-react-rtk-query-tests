import { LoadingPlaceholder, Table } from '@cobalt/cobalt-react-components'

interface Props {
  small?: boolean;
}

export const LoadingRow = ({ small = false }: Props) =>
  small ? (
    <Table.Row data-loading>
      <Table.Data>
        <LoadingPlaceholder large />
      </Table.Data>
    </Table.Row>
  ) : (
    <Table.Row data-loading="">
      <Table.Data>
        <LoadingPlaceholder medium />
      </Table.Data>
      <Table.Data>
        <LoadingPlaceholder small />
      </Table.Data>
      <Table.Data>
        <LoadingPlaceholder medium />
      </Table.Data>
      <Table.Data>
        <LoadingPlaceholder medium />
      </Table.Data>
      <Table.Data>
        <LoadingPlaceholder small />
      </Table.Data>
    </Table.Row>
  )

export default LoadingRow
