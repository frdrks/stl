/* eslint-env jest */

import { elapsed } from '../elapsed'
import { DAY, WEEK } from '../constants'

describe('Elapsed time', () => {
  test('Get elapsed time for day', () => {
    const ts = new Date('2019-06-12T12:00:00.000Z').getTime()
    expect(elapsed(DAY, ts)).toBe(DAY / 2)
  })

  test('Get elapsed time for started day', () => {
    const ts = new Date('2019-06-12T00:00:00.000Z').getTime()
    expect(elapsed(DAY, ts)).toBe(0)
  })

  test('Get elapsed time for ended day', () => {
    const ts = new Date('2019-06-12T23:59:59.999Z').getTime()
    expect(elapsed(DAY, ts)).toBe(DAY - 1)
  })

  test('Get elapsed time for week', () => {
    const ts = new Date('2019-06-12T00:00:00.000Z').getTime()
    const ms12Hours = (2 * 24 * 60 * 60 * 1000)

    expect(elapsed(WEEK, ts)).toBe(ms12Hours)
  })

  test('Get elapsed time for started week', () => {
    const ts = new Date('2019-06-10T00:00:00.000Z').getTime()
    expect(elapsed(WEEK, ts)).toBe(0)
  })

  test('Get elapsed time for ended week', () => {
    const ts = new Date('2019-06-16T23:59:59.999Z').getTime()
    expect(elapsed(WEEK, ts)).toBe(WEEK - 1)
  })
})

describe('Elapsed time on January 1st 1970', () => {
  test('Get elapsed time for started day', () => {
    const ts = new Date(0).getTime()
    expect(elapsed(DAY, ts)).toBe(0)
  })

  test('Get elapsed time for day', () => {
    const ts = new Date(DAY / 2).getTime()
    expect(elapsed(DAY, ts)).toBe(DAY / 2)
  })

  test('Get elapsed time for ended day', () => {
    const ts = new Date(DAY - 1).getTime()
    expect(elapsed(DAY, ts)).toBe(DAY - 1)
  })

  test('Get elapsed time for week', () => {
    const ts = new Date('1970-01-04T12:00:00.000Z').getTime()
    expect(elapsed(WEEK, ts)).toBe(WEEK - (DAY / 2))
  })
})

describe('Elapsed time on dates prior to 1970', () => {
  test('Get elapsed time for day', () => {
    const ts = new Date('1965-06-12T12:00:00.000Z').getTime()
    expect(elapsed(DAY, ts)).toBe(DAY / 2)
  })

  test('Get elapsed time for started day', () => {
    const ts = new Date('1965-06-12T00:00:00.000Z').getTime()
    expect(elapsed(DAY, ts)).toBe(0)
  })

  test('Get elapsed time for ended day', () => {
    const ts = new Date('1965-06-12T23:59:59.999Z').getTime()
    expect(elapsed(DAY, ts)).toBe(DAY - 1)
  })

  test('Get elapsed time for week', () => {
    const ts = new Date('1965-06-16T00:00:00.000Z').getTime()
    expect(elapsed(WEEK, ts)).toBe(2 * 24 * 60 * 60 * 1000)
  })

  test('Get elapsed time for started week', () => {
    const ts = new Date('1965-06-14T00:00:00.000Z').getTime()
    expect(elapsed(WEEK, ts)).toBe(0)
  })

  test('Get elapsed time for ended week', () => {
    const ts = new Date('1965-06-20T23:59:59.999Z').getTime()
    expect(elapsed(WEEK, ts)).toBe(WEEK - 1)
  })
})
