/* eslint import/no-webpack-loader-syntax: off */

import alasql from 'alasql'

class DataContainer {
  constructor (dataFrame, tableName, ddl, tsColumn, endTsColumn = null) {
    this.tableName = tableName
    this.tsColumn = tsColumn
    this.endTsColumn = endTsColumn
    this.db = alasql.Database();
    /* eslint-disable */
    (async () => {
    /* eslint-enable */
      await this.db.exec(ddl)
      await this.db.exec(`SELECT * INTO ${tableName} FROM ?`, [dataFrame])
      await this.db.exec(`
        CREATE INDEX ${tsColumn}_idx ON ${tableName}(${tsColumn});
        CREATE INDEX ${endTsColumn}_idx ON ${tableName}(${endTsColumn});
      `)
      this.minTs = await this.db.exec(
        `SELECT FIRST(${tsColumn}) AS res FROM ${tableName}`)[0].res.substring(0, 4)
      this.currTs = this.minTs
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
      const ACTIVE_ONLY_FILTER = `${this.endTsColumn} < '${ts + 1}'`
      let queryText = (`
        SELECT *
        FROM ${this.tableName}
        WHERE 1=1
          AND ${this.tsColumn} <= '${ts + 1}'
          AND ${ACTIVE_ONLY_FILTER}
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
