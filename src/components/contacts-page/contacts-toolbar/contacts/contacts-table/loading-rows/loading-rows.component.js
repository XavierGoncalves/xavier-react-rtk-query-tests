import { useMemo } from 'react'
import { LoadingPlaceholder, Table } from '@cobalt/cobalt-react-components'
import { ContactLoading } from '../contact'

const SmallLoadingRow = () => (
  <Table.Row>
    <Table.Data>
      <ContactLoading />
    </Table.Data>
  </Table.Row>
)

const LargeLoadingRow = () => (
  <Table.Row>
    <Table.Data>
      <ContactLoading />
    </Table.Data>
    <Table.Data>
      <LoadingPlaceholder medium />
    </Table.Data>
    <Table.Data>
      <LoadingPlaceholder large />
    </Table.Data>
    <Table.Data>
      <LoadingPlaceholder medium />
    </Table.Data>
  </Table.Row>
)

const LoadingRows = ({ numberOfRows, small = false }) =>
  useMemo(
    () => (
      <>
        {[...Array(numberOfRows).keys()].map(i =>
          small ? <SmallLoadingRow key={i} /> : <LargeLoadingRow key={i} />
        )}
      </>
    ),
    [numberOfRows, small]
  )

export default LoadingRows
