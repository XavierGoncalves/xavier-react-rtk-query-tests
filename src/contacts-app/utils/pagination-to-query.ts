interface Input {
    page: number;
}

const paginationToQuery = ({ page }: Input) => {
    const query = {
        page: page > 1 ? page : undefined
    }
    return query
}

export default paginationToQuery
