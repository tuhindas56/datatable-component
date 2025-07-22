import { format, fromUnixTime, getUnixTime } from "date-fns"

const convertToUnixTimestamp = date => getUnixTime(date)
const convertFromUnixTimestamp = date => fromUnixTime(date)
const dateFormatter = date => format(date, "dd MMM yyyy")
const timeFormatter = time => format(time, "h:mm a")

export { convertToUnixTimestamp, convertFromUnixTimestamp, dateFormatter, timeFormatter }
