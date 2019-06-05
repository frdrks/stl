import { DAY, WEEK, YEAR, FIRST_EPOCH_DAY, MONTH } from './constants'

export function correct (interval: number, timestamp: number): number {
  switch (interval) {
    case WEEK:
      return _correctFirstWeek(timestamp)
    case YEAR:
      return _correctLeapYears(timestamp)
    case MONTH:
      return _correctUnevenMonths(timestamp)
    default:
      return 0
  }
}

function _correctFirstWeek(timestamp: number): number {
  switch (true) {
    case timestamp >= FIRST_EPOCH_DAY:
      return FIRST_EPOCH_DAY
    case timestamp <= FIRST_EPOCH_DAY && timestamp >= 0:
      return -FIRST_EPOCH_DAY
    case timestamp < 0:
      return +(FIRST_EPOCH_DAY - WEEK)
    default:
      return 0
  }
}

function _correctUnevenMonths(ts: number): number {
  const years = Math.trunc(ts / YEAR)
  const excessDaysTotal = (years * DAY * 5) + _correctLeapYears(ts)
  const months = Math.trunc(((ts - _correctLeapYears(ts)) % YEAR) / MONTH)

  switch (months) {
    case 1:
    case 5:
    case 6:
      return excessDaysTotal + DAY
    case 2:
      return excessDaysTotal - DAY
    case 3:
    case 4:
      return excessDaysTotal
    case 7:
      return excessDaysTotal + (DAY * 2)
    case 8:
    case 9:
      return excessDaysTotal + (DAY * 3)
    case 10:
    case 11:
      return excessDaysTotal + (DAY * 4)
    case 12:
      return excessDaysTotal + (DAY * 5)
  }

  return 0
}

function _correctLeapYears(timestamp: number): number {
  return _getLeapYears(timestamp) * DAY
}

function _getLeapYears(timestamp: number): number {
  return Math.trunc((timestamp + YEAR + YEAR - DAY) / (4 * YEAR))
}