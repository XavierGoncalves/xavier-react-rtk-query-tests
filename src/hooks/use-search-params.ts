import { useSearchParams } from "react-router-dom"

const useAppUrlParams = () => {
    const [params] = useSearchParams()

    const page = Number(params.get('page') || 1)
    const sort = params.get('sort') || "name"
    const search = params.get('search')
    return {page, sort, search}
}

export default useAppUrlParams
