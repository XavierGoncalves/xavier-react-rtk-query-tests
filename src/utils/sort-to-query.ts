const sortToQuery = ({ sort }) => {
    const { field, direction } = sort
    const query = {
        sort: `${direction === 'desc' ? '-' : ''}${field}`
    }

    return query
}
export default sortToQuery
