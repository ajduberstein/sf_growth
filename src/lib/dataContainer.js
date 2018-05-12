/* eslint import/no-webpack-loader-syntax: off */

import alasql from 'alasql'

class DataContainer {
  constructor (dataFrame, tableName, ddl, tsColumn) {
    this.tableName = tableName
    this.tsColumn = tsColumn
    this.db = alasql.Database();
    /* eslint-disable */
    (async () => {
    /* eslint-enable */
      await this.db.exec(ddl)
      await this.db.exec(`SELECT * INTO ${tableName} FROM ?`, [dataFrame])
      await this.db.exec(`
        CREATE INDEX ${tsColumn}_idx ON ${tableName}(${tsColumn});
      `)
      this.minTs = '1968'
      this.currTs = '1968'
    })()
    this.lastTs = '2017'
    this.query = this.query.bind(this)
    this.nextResultSet = this.nextResultSet.bind(this)
    this.getResultSetAtTime = this.getResultSetAtTime.bind(this)
  }

  query (queryText) {
    return this.db.exec(queryText)
  }

  getResultSetAtTime (ts) {
    return (async () => {
      let queryText = (`
        SELECT *
        FROM ${this.tableName}
        WHERE 1=1
          AND ${this.tsColumn} <= '${ts + 1}'
      `)
      return this.query(queryText)
    })()
  }

  nextResultSet () {
    const backTs = '' + this.currTs
    if (this.currTs < this.lastTs) {
      this.currTs = '' + (backTs * 1 + 1)
    } else {
      this.currTs = this.minTs
    }
    return this.getResultSetAtTime(this.currTs)
  }
}

export {
  DataContainer
}
