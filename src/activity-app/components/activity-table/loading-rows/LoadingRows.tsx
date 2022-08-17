import LoadingRow from "activity-app/components/activity-table/loading-rows/loading-row/LoadingRow.component"

interface Props {
    numberOfRows: number;
}

const LoadingRows = ({ numberOfRows }: Props) =>
    <>{[...Array(numberOfRows).keys()].map(i => <LoadingRow key={i} />)}</>


export default LoadingRows
