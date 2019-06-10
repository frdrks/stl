import { DAY, WEEK, YEAR, MONTH, EPOCH_FIRST_WEEK, EPOCH_FIRST_LEAP_YEAR } from './constants'

export function correct (interval: number, timestamp: number): number {
  switch (interval) {
    case WEEK:
      return Instant(timestamp)
        .map(_correctEpochFirstWeek)
        .value()

    case YEAR:
      return Instant(timestamp)
        .map(_correctLeapYears)
        .value()

    case MONTH:
      return Instant(timestamp)
        .map(_correctLeapYears)
        .map(_correctUnevenMonths)
        .value()

    default:
      return timestamp
  }
}

function Instant (time: number) {
  return {
    map (fn: Function) {
      return Instant(fn(time))
    },
    value (): number { return time }
  }
}

function _correctEpochFirstWeek (timestamp: number): number {
  /* After first week in unix epoch */
  if (timestamp >= EPOCH_FIRST_WEEK) {
    /* Remove first incomplete week in unix epoch */
    return timestamp - EPOCH_FIRST_WEEK
  }

  /* Within first week in unix epoch */
  if (timestamp <= EPOCH_FIRST_WEEK && timestamp >= 0) {
    /* Add missing time in first week in unix epoch */
    return timestamp + (WEEK - EPOCH_FIRST_WEEK)
  }

  /* Before unix epoch */
  if (timestamp < 0) {
    /* Add missing days from first week in unix epoch */
    return timestamp - EPOCH_FIRST_WEEK
  }

  return timestamp
}

function _correctUnevenMonths (timestamp: number): number {
  const years = Math.trunc(timestamp / YEAR)
  const excessDaysTotal = years * DAY * 5
  const months = Math.trunc((timestamp % YEAR) / MONTH)

  switch (months) {
    case 1:
    case 5:
    case 6:
      return timestamp - (excessDaysTotal + DAY)
    case 2:
      return timestamp - (excessDaysTotal - DAY)
    case 3:
    case 4:
      return timestamp - excessDaysTotal
    case 7:
      return timestamp - (excessDaysTotal + (DAY * 2))
    case 8:
    case 9:
      return timestamp - (excessDaysTotal + (DAY * 3))
    case 10:
    case 11:
      return timestamp - (excessDaysTotal + (DAY * 4))
    case 12:
      return timestamp - (excessDaysTotal + (DAY * 5))
  }

  return 0
}

function _correctLeapYears (timestamp: number): number {
  return timestamp - (_getNumLeapYears(timestamp) * DAY)
}

function _getNumLeapYears (timestamp: number): number {
  return Math.trunc((timestamp + (Math.sign(timestamp) * EPOCH_FIRST_LEAP_YEAR)) / (4 * YEAR))
}
