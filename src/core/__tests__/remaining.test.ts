import { remaining } from '../remaining'
import { DAY, MONTH, WEEK } from '../constants'

describe('Remaining time', () => {
  test('Get remaining time of day', () => {
    const ts = new Date('2019-06-12T12:00:00.000Z').getTime()
    const ms12Hours = (12 * 60 * 60 * 1000)

    expect(remaining(DAY, ts)).toBe(ms12Hours)
  })

  test('Get remaining time of entire day', () => {
    const ts = new Date('2019-06-12T00:00:00.000Z').getTime()
    expect(remaining(DAY, ts)).toBe(DAY)
  })

  test('Get remaining time of ended day', () => {
    const ts = new Date('2019-06-12T23:59:59.999Z').getTime()
    expect(remaining(DAY, ts)).toBe(1)
  })

  test('Get remaining time of week', () => {
    const ts = new Date('2019-06-12T00:00:00.000Z').getTime()
    const ms12Hours = (5 * 24 * 60 * 60 * 1000)

    expect(remaining(WEEK, ts)).toBe(ms12Hours)
  })

  test('Get remaining time of entire week', () => {
    const ts = new Date('2019-06-10T00:00:00.000Z').getTime()
    const ms12Hours = (7 * 24 * 60 * 60 * 1000)

    expect(remaining(WEEK, ts)).toBe(ms12Hours)
  })

  test('Get remaining time of ended week', () => {
    const ts = new Date('2019-06-16T23:59:59.999Z').getTime()
    expect(remaining(WEEK, ts)).toBe(1)
  })

  test('Get remaining time of month', () => {
    const ts = new Date('2019-06-26T00:00:00.000Z').getTime()
    const ts2 = new Date('2019-04-23T00:00:00.000Z').getTime()
    const ts3 = new Date('2019-11-26T00:00:00.000Z').getTime()

    expect(remaining(MONTH, ts)).toBe(5 * 24 * 60 * 60 * 1000)
    expect(remaining(MONTH, ts2)).toBe(8 * 24 * 60 * 60 * 1000)
    expect(remaining(MONTH, ts3)).toBe(5 * 24 * 60 * 60 * 1000)
  })
})

describe('Remaining time on January 1st 1970', () => {
  test('Get remaining time of entire day', () => {
    const ts = new Date(0).getTime()
    expect(remaining(DAY, ts)).toBe(DAY)
  })

  test('Get remaining time of ended day', () => {
    const ms12Hours = (12 * 60 * 60 * 1000)
    const ts = new Date(DAY / 2).getTime()
    expect(remaining(DAY, ts)).toBe(ms12Hours)
  })

  test('Get remaining time of ended day', () => {
    const ts = new Date(DAY - 1).getTime()
    expect(remaining(DAY, ts)).toBe(1)
  })

  test('Get remaining time of week', () => {
    const ts = new Date(0).getTime()
    expect(remaining(WEEK, ts)).toBe(4 * 24 * 60 * 60 * 1000)
  })
})

describe('Remaining time on dates prior to 1970', () => {
  test('Get remaining time of day', () => {
    const ts = new Date('1965-06-12T12:00:00.000Z').getTime()
    const ms12Hours = (12 * 60 * 60 * 1000)

    expect(remaining(DAY, ts)).toBe(ms12Hours)
  })

  test('Get remaining time of entire day', () => {
    const ts = new Date('1965-06-12T00:00:00.000Z').getTime()
    expect(remaining(DAY, ts)).toBe(DAY)
  })

  test('Get remaining time of ended day', () => {
    const ts = new Date('1965-06-12T23:59:59.999Z').getTime()
    expect(remaining(DAY, ts)).toBe(1)
  })

  test('Get remaining time of week', () => {
    const ts = new Date('1965-06-16T00:00:00.000Z').getTime()
    const remainingTime = 5 * 24 * 60 * 60 * 1000

    expect(remaining(WEEK, ts)).toBe(remainingTime)
  })

  test('Get remaining time of entire week', () => {
    const ts = new Date('1965-06-14T00:00:00.000Z').getTime()
    expect(remaining(WEEK, ts)).toBe(WEEK)
  })

  test('Get remaining time of ended week', () => {
    const ts = new Date('1965-06-20T23:59:59.999Z').getTime()
    expect(remaining(WEEK, ts)).toBe(1)
  })
})