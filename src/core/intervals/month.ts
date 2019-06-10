import { interval } from './interval'
import { DAY, EPOCH_FIRST_LEAP_YEAR, MONTH, YEAR } from '../constants'

function correctUnevenMonths (timestamp: number): number {
  // TODO: This doesn't work :'( FIX FIX!
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

// const months = [
//   [MONTH, DAY],
//   [MONTH, 2 * DAY],
//   [MONTH, DAY],
//   [MONTH, 0],
//   [MONTH, DAY],
//   [MONTH, 0],
//   [MONTH, DAY],
//   [MONTH, DAY],
//   [MONTH, 0],
//   [MONTH, DAY],
//   [MONTH, 0],
//   [MONTH, DAY]
// ]
//
// function corrector (timestamp: number): number {
//   const remainingDaysOfYear = correctLeapYears(timestamp) % YEAR
//   const startOfMonth = months.reduce((acc: number, cur: number[]): number => {
//     return acc + (cur[0] + cur[1]) < remainingDaysOfYear ? acc + (cur[0] + cur[1]) : acc
//   }, 0)
//   const remainingDaysOfMonth = remainingDaysOfYear % startOfMonth
//   return (timestamp - remainingDaysOfYear) + startOfMonth + remainingDaysOfMonth
// }

function correctLeapYears (timestamp: number): number {
  return timestamp - (_getNumLeapYears(timestamp) * DAY)
}

function _getNumLeapYears (timestamp: number): number {
  return Math.trunc((timestamp + (Math.sign(timestamp) * EPOCH_FIRST_LEAP_YEAR)) / (4 * YEAR))
}

const composedCorrector = (ts: number) => correctUnevenMonths(correctLeapYears(ts))

export const month = interval(composedCorrector, MONTH)
