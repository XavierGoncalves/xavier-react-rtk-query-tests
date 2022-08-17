interface Input {
    field: string;
    direction: string;
}

const sortToQuery = ({ field, direction }: Input) => {
    const query = {
        sortBy: `${direction === 'desc' ? '-' : ''}${field}`
    }

    return query
}
export default sortToQuery
