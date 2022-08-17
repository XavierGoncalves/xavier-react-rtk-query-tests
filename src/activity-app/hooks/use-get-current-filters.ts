import useAppUrlParams from "activity-app/hooks/use-app-url-params"

const useGetCurrentFilters = () => {
    const { 
        agent,
        contact,
        ringGroups,
        type,
        via,
        when
    } = useAppUrlParams()
    return { 
        agent,
        contact,
        ringGroups,
        type,
        via,
        when
    }
}

export default useGetCurrentFilters
