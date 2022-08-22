import { STATE_ERROR, STATE_LOADING, STATE_NO_FILTERED_RESULTS, STATE_NO_RESULTS, STATE_READY } from "voicemails-app/constants/state-types.constants"


const computeState = (isError: boolean, isFetching: boolean, activeFiltersCount: number, total: number) => {
    if(isError) {
        return STATE_ERROR
    }
    if (isFetching) {
        return STATE_LOADING
    }
    if(Number(total) > 0) {
        return STATE_READY
    }
    if(activeFiltersCount > 0 && !total) {
        return STATE_NO_FILTERED_RESULTS
    }
    if(activeFiltersCount === 0 && !total) {
        return STATE_NO_RESULTS
    }
    return STATE_READY
}

export default computeState
