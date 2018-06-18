export default class DataContainer {
  constructor (data, indexCol) {
    this.index = {}
    this.indexCol = indexCol
    this.data = data
    this._constructIndex()
  }

  _constructIndex () {
    // find the max rownum that has a
    // particular year as its value
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

  getFromMinToVal (value) {
    return this.data.slice(0, this.index[value] + 1)
  }
}
