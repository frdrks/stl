import { interval } from './interval'
import { DAY, YEAR, EPOCH_FIRST_LEAP_YEAR } from '../constants'

function correctLeapYears (timestamp: number): number {
  return timestamp - (getNumLeapYears(timestamp) * DAY)
}

function getNumLeapYears (timestamp: number): number {
  return Math.trunc((timestamp + (Math.sign(timestamp) * EPOCH_FIRST_LEAP_YEAR)) / (4 * YEAR))
}

export const year = interval(correctLeapYears, YEAR)
