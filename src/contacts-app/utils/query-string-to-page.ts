import { validatePage } from "./parameter-validation"

const queryStringToPage = (page: string | null) => {
    if(page) {
        return validatePage(page)
    }
    return 1

}

export default queryStringToPage
