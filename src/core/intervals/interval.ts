import { duration } from './util'

type intervalFunctor = {
  map: Function,
  elapsed: Function,
  remaining: Function,
  startOf: Function,
  endOf: Function,
  length: Function
}

export function interval (correction: Function, intervalLength: number): Function {
  function definedInterval (timestamp: number): intervalFunctor {
    return {
      map (fn: Function): intervalFunctor {
        return definedInterval(fn(timestamp))
      },
      elapsed (): number {
        return duration(timestamp)
          .map(correction)
          .map((time: number) => time % intervalLength)
          .map((time: number) => time === 0 ? 0 : time)
          .map((time: number) => time < 0 ? intervalLength + time : time)
          .length()
      },
      remaining (): number {
        return intervalLength - this.elapsed() - 1
      },
      startOf (): number {
        return timestamp - this.elapsed()
      },
      endOf (): number {
        return timestamp + this.remaining()
      },
      length (): number {
        return intervalLength
      }
    }
  }

  return definedInterval
}
