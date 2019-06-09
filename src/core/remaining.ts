import { elapsed } from './elapsed'

/**
 * Get remaining time of given interval and timestamp
 * @param {number} interval - interval in milliseconds
 * @param {number} timestamp - milliseconds since start of unix epoch
 */
export function remaining (interval: number, timestamp: number): number {
  return interval - elapsed(interval, timestamp) % interval
}
