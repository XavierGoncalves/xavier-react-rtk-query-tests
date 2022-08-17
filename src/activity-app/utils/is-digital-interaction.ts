const isDigitalInteraction = type => {
    const types = {
        OUTBOUND_SMS: true,
        INBOUND_SMS: true
    }
    return !!types[type]
}

export default isDigitalInteraction
