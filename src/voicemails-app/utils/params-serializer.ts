import { stringify } from 'qs'

const paramsSerializer = params => stringify(params, { arrayFormat: 'repeat' })

export default paramsSerializer
