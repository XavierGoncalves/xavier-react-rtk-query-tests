import * as states from 'activity-app/constants/state.constants'

const computeState = (isError: boolean, isFetching: boolean, activeFiltersCount: number, total: number) => {
    if(isError) {
        return states.STATUS_ERROR
    }
    if (isFetching) {
        return states.STATUS_LOADING
    }
    if(Number(total) > 0) {
        return states.STATUS_READY
    }
    if(activeFiltersCount > 0 && !total) {
        return states.STATUS_NO_RESULTS
    }
    if(activeFiltersCount === 0 && !total) {
        return states.STATUS_NO_RESULTS
    }
    return states.STATUS_READY
}

export default computeState
