import { defaultFilterValues, DURATION_MINUTES, DURATION_SECONDS } from "voicemails-app/constants/filters.constants"

const DURATION_REG_EXP = /^(\d+)(-(\d+))?(s|m)$/

const isValidInterval = (start, end) => parseInt(start, 10) <= parseInt(end, 10)

const toFullUnit = unit => (unit === 'm' ? DURATION_MINUTES : DURATION_SECONDS)


const queryStringToDuration = value => {
    const matchesRegExp = value && value.match(DURATION_REG_EXP)

    if (matchesRegExp) {
        const [, min, , max, unit] = matchesRegExp
        const intMin = parseInt(min, 10)
        const intMax = parseInt(max, 10)

        const isValidSingleDuration = !max && intMin > 0
        const isValidIntervalDuration = isValidInterval(min, max) && intMax > 0

        if (isValidSingleDuration || isValidIntervalDuration) {
            return {
                min: intMin,
                max: max ? intMax : null,
                unit: toFullUnit(unit)
            }
        }
    }
    return defaultFilterValues.duration
}
export default queryStringToDuration
