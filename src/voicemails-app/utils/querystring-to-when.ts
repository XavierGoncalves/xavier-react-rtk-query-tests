import { CUSTOM } from "voicemails-app/constants/filters.constants"

const PRESET_DATES = ['last-six-hours', 'last-day', 'last-week', 'last-month']
const CUSTOM_DATE_REG_EXP = /^((20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1]))(-((20\d{2})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])))?$/

const toPresetDate = date => date.replace(/-/g, '_').toUpperCase()

const isValidInterval = (start, end) => parseInt(start, 10) <= parseInt(end, 10)

const toIsoDate = (year, month, day) =>
  new Date(year, month - 1, day).toISOString()

const queryStringToWhen = value => {
    const isPresetDate = PRESET_DATES.includes(value)
    const matchesCustomRegExp = value && value.match(CUSTOM_DATE_REG_EXP)

    if (isPresetDate) {
        return {
            value: toPresetDate(value),
            customRange: { start: null, end: null }
        }
    } else if (matchesCustomRegExp) {
        const [, sFull, sY, sM, sD, , eFull, eY, eM, eD] = matchesCustomRegExp

        if (!eFull || isValidInterval(sFull, eFull)) {
            const start = toIsoDate(sY, sM, sD)
            const end = eFull ? toIsoDate(eY, eM, eD) : start

            return {
                value: CUSTOM,
                customRange: { start, end }
            }
        }
    }
    return null
}

export default queryStringToWhen
