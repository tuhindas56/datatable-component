import { format, fromUnixTime, getUnixTime } from "date-fns"

const convertToUnixTimestamp = date => getUnixTime(date)

const convertFromUnixTimestamp = date => fromUnixTime(date)

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
}).format

const mergeFilters = (prevFilters, updatedFilters) => {
  const merged = prevFilters.map(prev => {
    const updated = updatedFilters.find(filter => filter.id === prev.id)
    return updated || prev
  })

  for (const updated of updatedFilters) {
    if (!prevFilters.some(prev => prev.id === updated.id)) {
      merged.push(updated)
    }
  }

  return merged
}

export { convertToUnixTimestamp, convertFromUnixTimestamp, dateFormatter, mergeFilters }
