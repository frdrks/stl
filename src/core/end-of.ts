import { remaining } from './remaining'

export function endOf (interval: number, timestamp: number): number {
  return timestamp + remaining(interval, timestamp) - 1
}
