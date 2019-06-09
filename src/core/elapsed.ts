import { correct } from './correct'

/**
 * Get elapsed time for given interval and timestamp
 * @param {number} interval - interval in milliseconds
 * @param {number} timestamp - milliseconds since start of unix epoch
 */
export function elapsed (interval: number, timestamp: number): number {
  const elapsedTime = correct(interval, timestamp) % interval
  return timestamp >= 0
    ? elapsedTime
    : elapsedTime === 0
      ? 0
      : interval + elapsedTime
}
