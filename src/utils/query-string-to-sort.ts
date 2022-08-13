import { validateSort } from "./parameter-validation"

const queryStringToSort = (sort: string | null) => {
    return validateSort(sort)
}
export default queryStringToSort
