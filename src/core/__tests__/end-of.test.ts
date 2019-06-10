/* eslint-env jest */

import { endOf } from '../end-of'
import { DAY, WEEK, YEAR } from '../constants'

describe('End of interval', () => {
  test('End of day', () => {
    const ts = new Date('2019-06-12T13:37:00.000Z').getTime()
    expect(endOf(DAY, ts)).toBe(new Date('2019-06-12T23:59:59.999Z').getTime())
  })

  test('End of week', () => {
    const ts = new Date('2019-06-12T13:37:00.000Z').getTime()
    expect(endOf(WEEK, ts)).toBe(new Date('2019-06-16T23:59:59.999Z').getTime())
  })

  test('End of year', () => {
    const ts = new Date('2019-06-12T13:37:00.000Z').getTime()
    expect(endOf(YEAR, ts)).toBe(new Date('2019-12-31T23:59:59.999Z').getTime())
  })
})
