/* eslint-env jest */
import DataContainer from './dataContainer'

const TEST_DATA = [
  {year: '1988', name: 'Bush'},
  {year: '1992', name: 'Clinton'},
  {year: '1996', name: 'Clinton'},
  {year: '2000', name: 'Bush'},
  {year: '2004', name: 'Bush'},
  {year: '2012', name: 'Obama'},
  {year: '2008', name: 'Obama'},
  {year: '2016', name: 'Trump'}
]

describe('DataContainer', () => {
  describe('constructor', () => {
    it('sort and retrieve objects', () => {
      const w = new DataContainer(TEST_DATA, 'year')
      let res = w.getFromMinToVal(2012)
      expect(res.length).toBe(7)
      res = w.getFromMinToVal(1988)
      expect(res.length).toBe(1)
      res = w.getFromMinToVal(1992)
      expect(res.length).toBe(2)
    })
  })
})
