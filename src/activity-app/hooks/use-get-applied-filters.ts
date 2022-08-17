const useGetAppliedFilters = () => {}
//createSelector(
    // getActiveFilters,
    // getUsersEntries,
    // getUserId,
    // getContacts,
    // getPhoneNumbers,
    // (filters, users, userId, contacts, phoneNumbers) =>
    //     Object.keys(filters)
    //         .filter(filterName => isActiveFilter(filterName, filters[filterName]))
    //         .sort(compareFilters)
    //         .map(filterName => ({
    //             name: filterName,
    //             label: FILTER_LABELS[filterName],
    //             values: createArray(filters[filterName]).map(value => ({
    //                 value: value.id || value,
    //                 ...getFilterValueLabel(filterName, value, {
    //                     users,
    //                     userId,
    //                     contacts,
    //                     phoneNumbers
    //                 })
    //             }))
    //         }))


export default useGetAppliedFilters
