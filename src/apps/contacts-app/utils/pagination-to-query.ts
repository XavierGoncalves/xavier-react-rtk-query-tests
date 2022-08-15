const paginationToQuery = ({ page }) => {
    const query = {
        page: page > 1 ? page : undefined
    }

    return query
}

export default paginationToQuery
