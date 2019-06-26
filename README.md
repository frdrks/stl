# Simple time lib
A lightweight and low level time library, to handle, 
manipulate, and display time – in functional style.

_¡This is work in progress!_ 

## Philosophy
The philosophy behind STL, is to create a library that
has a minimal footprint in the overall application it
is included in.

To keep it lightweight, STL should avoid an extensive 
set of utility and helper functions – and provide composable
low level functions.

## Proposed interface
These are only proposed implementations, to guide further
development of the library. In other words, this is not working
code, but temporary suggestions on how the library can implemented.

_All examples are subject to change._

**Get duration**
```javascript
import { Duration } from 'stl'

const ts1 = new Date('2019-06-26T12:30:15.000')
const ts2 = new Date('2019-06-24T18:45:30.000')

const getDuration = (t1, t2) => {
  return Duration(t1, t2)
    .format((units) => {
      return Object.keys(units)
        .filter(key => units[key] > 0)
        .reduce((acc, cur) => {
          return `${acc} ${units[cur]} ${cur}`
        }, '')
    })
}

console.log(getDuration(ts2, ts1))
// 1 day 17 hour 44 minute 44 second
```  
   
**Create a date range**
```javascript
import { week } from 'stl/units'

const ts = new Date('2019-06-26T12:30:15.000Z').getTime()
const Week = week(ts)

const weekRange = {
  start: Week.map(ts => ts - (Week.length() * 2)).startOf(),
  end: Week.endOf()
}

console.log(new Date(weekRange.start))
// 2019-06-10T00:00:00.000Z

console.log(new Date(weekRange).end)
// 2019-06-30T23:59:59.999Z
```