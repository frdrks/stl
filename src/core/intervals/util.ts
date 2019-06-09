export function duration (timestamp: number) {
  return {
    map (fn: Function) {
      return duration(fn(timestamp))
    },
    length (): number { return timestamp }
  }
}
