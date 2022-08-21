import moment from 'moment'

const addDaysToDate = (date, numberOfDays) =>
  moment(date).utc().add(numberOfDays, 'days').toISOString()

export default addDaysToDate
