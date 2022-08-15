import { Buffer } from 'buffer';

const encodeCustomFieldKey = (customFieldKey: string) =>
    Buffer.from(customFieldKey).toString('base64')
export default encodeCustomFieldKey
