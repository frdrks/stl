/* eslint-env jest */

import { startOf } from '../start-of'
import { DAY, WEEK, YEAR } from '../constants'

describe('Start of interval', () => {
  test('Start of day', () => {
    const ts = new Date('2019-06-12T13:37:00.000Z').getTime()
    expect(startOf(DAY, ts)).toBe(new Date('2019-06-12T00:00:00.000Z').getTime())
  })

  test('Start of week', () => {
    const ts = new Date('2019-06-12T13:37:00.000Z').getTime()
    expect(startOf(WEEK, ts)).toBe(new Date('2019-06-10T00:00:00.000Z').getTime())
  })

  test('Start of year', () => {
    const ts = new Date('2019-06-12T13:37:00.000Z').getTime()
    expect(startOf(YEAR, ts)).toBe(new Date('2019-01-01T00:00:00.000Z').getTime())
  })
})
