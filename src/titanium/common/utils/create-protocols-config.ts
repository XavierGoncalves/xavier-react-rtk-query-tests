const PROMISE_REJECTED_STATUS = 'rejected'

const handlePromiseResponse = (uniqueProtocols, promiseResponse, atlasSdk) =>
    promiseResponse.reduce((acc, currentPromise, index) => {
        const { status: promiseStatus, value: isAvailable } = currentPromise
        if (promiseStatus === PROMISE_REJECTED_STATUS) {
            return acc
        }
        const currentProtocolId = uniqueProtocols[index]
        return {
            ...acc,
            [currentProtocolId]: {
                isAvailable,
                trigger: params => {
                    if (isAvailable) {
                        atlasSdk.protocol.trigger(currentProtocolId, params)
                    }
                }
            }
        }
    }, {})

export const createProtocolsConfig = async (protocolList, app) => {
    const { atlasSdk, logger } = app

    try {
        if (!protocolList || protocolList.length === 0) {
            throw new Error('Protocol list is undefined or empty')
        }
        const promiseArray = protocolList.map(protocol =>
            atlasSdk.protocol.isAvailable(protocol)
        )

        const promiseResponse = await Promise.allSettled(promiseArray)

        const protocolConfig = handlePromiseResponse(
            protocolList,
            promiseResponse,
            atlasSdk
        )

        app.protocolsConfig = protocolConfig
    } catch (error) {
        // logger.error(error)
        app.protocolsConfig = {}
    }
}
