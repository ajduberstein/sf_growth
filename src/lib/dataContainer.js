/**
 * Container for efficient retrieval of accumulating ordinal data
 *
 * @constructor
 * @param data {Object[]} the data to be indexed
 * @param indexCol {string} the key name to index the input data on
 */
export default class DataContainer {
  constructor (data, indexCol) {
    this.index = {}
    this.indexCol = indexCol
    this.data = data
    this._constructIndex()
  }

  /**
   * Sort the input data and create a lookup table for an index
   * Lookup table is of the format {indexValue: dataArrayIndex}
   */
  _constructIndex () {
    this.data = this.data.sort((a, b) => {
      return a[this.indexCol] - b[this.indexCol]
    })

    for (let i = 0; i < this.data.length - 1; i++) {
      let currKey = this.data[i][this.indexCol]
      let nextKey = this.data[i + 1][this.indexCol]
      if (currKey !== nextKey) {
        this.index[currKey] = i
      }
    }
  }

  /**
   * Return an array of object references
   * from the minimum index value to the specified one
   * @param value {string} highest value to return
   */
  getFromMinToVal (value) {
    return this.data.slice(0, this.index[value] + 1)
  }

  reduce (reduceFunc) {
    return this.data.reduce(reduceFunc)
  }

  filter (filterFunc) {
    return this.data.filter(filterFunc)
  }
}
