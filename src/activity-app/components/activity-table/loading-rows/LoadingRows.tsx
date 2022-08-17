import LoadingRow from "activity-app/components/activity-table/loading-rows/loading-row/LoadingRow.component"

interface Props {
    numberOfRows: number;
    small?: boolean;
}

const LoadingRows = ({ numberOfRows, small = false }: Props) =>
    <>{[...Array(numberOfRows).keys()].map(i => <LoadingRow key={i} small={small} />)}</>


export default LoadingRows
