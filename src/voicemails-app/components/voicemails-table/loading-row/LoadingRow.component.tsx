import { LoadingPlaceholder, Table } from '@cobalt/cobalt-react-components'

const LoadingRow = ({ small = false }) =>
  small ? (
    <Table.Row>
      <Table.Data>
        <LoadingPlaceholder large />
      </Table.Data>
    </Table.Row>
  ) : (
    <Table.Row>
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
      <Table.Data>
        <LoadingPlaceholder medium />
      </Table.Data>
      <Table.Data>
        <LoadingPlaceholder small />
      </Table.Data>
    </Table.Row>
  )

export default LoadingRow
