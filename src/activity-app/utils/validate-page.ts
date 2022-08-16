const validatePage = (value: string | null) => {
    if(value === null) {
        return "1"
    }
    const intValue = parseInt(value, 10)
    return String(intValue > 0 ? intValue : 1)
}

export default validatePage
