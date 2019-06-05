import { correct } from './correct'

export function remaining (interval: number, timestamp: number): number {
  const remainingTime = interval - (timestamp - correct(interval, timestamp)) % interval
  return timestamp >= 0
    ? remainingTime
    : remainingTime === interval
      ? remainingTime
      : Math.abs(interval - remainingTime)
}