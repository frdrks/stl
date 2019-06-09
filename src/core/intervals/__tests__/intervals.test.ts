import { week } from '../week'
import { year } from '../year'
import { YEAR } from '../../constants'

describe('Week interval', () => {
  test('End of week', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(week(ts).startOf()).toBe(new Date('2019-06-03T00:00:00.000Z').getTime())
  })
  test('End of week', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(week(ts).endOf()).toBe(new Date('2019-06-09T23:59:59.999Z').getTime())
  })
})

describe('Year interval', () => {
  test('End of year', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(year(ts).startOf()).toBe(new Date('2019-01-01T00:00:00.000Z').getTime())
  })
  test('End of year', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(year(ts).endOf()).toBe(new Date('2019-12-31T23:59:59.999Z').getTime())
  })
  test('Substract 2 years', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(year(ts).map((ts: number) => ts - (2 * YEAR)).endOf()).toBe(new Date('2017-12-31T23:59:59.999Z').getTime())
  })
})
