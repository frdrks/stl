import { interval } from './interval'
import { EPOCH_FIRST_WEEK, WEEK } from '../constants'

function correctEpochFirstWeek (timestamp: number): number {
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

export const week = interval(correctEpochFirstWeek, WEEK)
