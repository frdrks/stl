/* eslint-env jest */

import { week } from '../week'
import { year } from '../year'
import { YEAR } from '../../constants'
import { month } from '../month'

describe('Week interval', () => {
  test('Start of week', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(week(ts).startOf()).toBe(new Date('2019-06-03T00:00:00.000Z').getTime())
  })
  test('End of week', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(week(ts).endOf()).toBe(new Date('2019-06-09T23:59:59.999Z').getTime())
  })
})

describe('Month interval', () => {
  test('Start of month', () => {
    const ts = new Date('2019-06-07T12:00:00.000Z').getTime()
    expect(new Date(month(ts).startOf())).toStrictEqual(new Date('2019-06-01T00:00:00.000Z'))
  })
  test('End of month', () => {
    const february2016 = month(new Date('2016-02-07T12:00:00.000Z').getTime())
    const february2019 = month(new Date('2019-02-07T12:00:00.000Z').getTime())
    const june2019 = month(new Date('2019-06-07T12:00:00.000Z').getTime())

    expect(new Date(february2016.endOf())).toStrictEqual(new Date('2016-02-29T23:59:59.999Z'))
    expect(new Date(february2019.endOf())).toStrictEqual(new Date('2019-02-28T23:59:59.999Z'))
    expect(june2019.endOf()).toBe(new Date('2019-05-31T23:59:59.999Z').getTime())
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
