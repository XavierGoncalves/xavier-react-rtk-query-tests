import { validateSort } from "./parameter-validation"

const queryStringToSort = (sortBy: string | null) => {
    return validateSort(sortBy)
}
export default queryStringToSort
