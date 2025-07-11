import { format, fromUnixTime, getUnixTime } from "date-fns"

export const convertToUnixTimestamp = date => getUnixTime(date)
export const convertFromUnixTimestamp = date => format(fromUnixTime(date), "yyyy-MM-dd")
