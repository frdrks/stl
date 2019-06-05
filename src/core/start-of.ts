import { elapsed } from './elapsed'

export function startOf(interval: number, timestamp: number): number {
  return timestamp - elapsed(interval, timestamp)
}