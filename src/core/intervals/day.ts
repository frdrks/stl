import { interval } from './interval'
import { DAY } from '../constants'

export const day = interval((ts: number) => ts, DAY)
