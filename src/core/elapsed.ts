import { correct } from './correct'

export function elapsed (interval: number, timestamp: number): number {
  const elapsedTime = (timestamp - correct(interval, timestamp)) % interval
  return timestamp > 0
    ? elapsedTime
    : elapsedTime === 0
      ? 0
      : interval + elapsedTime
}