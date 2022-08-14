import * as states from 'constants/state.constants'

const computeState = (isError: boolean, isFetching: boolean, search?: string| null, total?: number) => {
    if(isError) {
        return states.ERROR
    }
    if (isFetching) {
        return states.LOADING
    }
    if(Number(total) > 0) {
        return states.READY
    }
    if(search) {
        return states.NO_RESULTS
    }
    return states.EMPTY
}

export default computeState
