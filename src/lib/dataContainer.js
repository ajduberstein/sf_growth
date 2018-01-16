/* eslint import/no-webpack-loader-syntax: off */

import alasql from 'alasql';


const addDays = (currDay, delta) => {
  return new Date(new Date(currDay).getTime() + 
    (delta*24*60*60*1000));
}


const formatDate = (date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

class DataContainer {

  constructor(dataFrame, tableName, ddl, tsColumn, endTs = null) {
    this.tableName = tableName;
    this.tsColumn = tsColumn;
    this.endTsColumn = endTs;
    this.db = alasql.Database();
    this.db.exec(ddl);
    this.db.exec(`SELECT * INTO ${tableName} FROM ?`, [dataFrame])
    this.db.exec(`
      CREATE INDEX ${tsColumn}_idx ON ${tableName}(${tsColumn});
    `)
    this.minTs = this.db.exec(
      `SELECT FIRST(${tsColumn}) AS res FROM ${tableName}`)[0].res
    this.currTs = "" + this.minTs;
    this.lastTs = '2017-01-01'
    this.query = this.query.bind(this);
    this.nextResultSet = this.nextResultSet.bind(this);
  }

  query(queryText) {
    return this.db.exec(queryText);
  }

  nextResultSet() {
    const backTs = "" + this.currTs;
    if (this.currTs < this.lastTs) {
      this.currTs = formatDate(addDays(this.currTs, 360));
    } else {
      this.currTs = this.minTs;
    }

    const ACTIVE_ONLY_FILTER = `
      (${this.endTsColumn} IS NULL 
      OR ${this.endTsColumn} < '${this.currTs}')`
    const RECENT_SNAPSHOT_FILTER = `AND ${this.tsColumn} BETWEEN '${backTs}' AND '${this.currTs}`

    let queryText = (`
      SELECT *
      FROM ${this.tableName}
      WHERE 1=1
        AND ${this.tsColumn} <= '${this.currTs}'
        AND ${ACTIVE_ONLY_FILTER}
    `)
    console.log(queryText)
    return this.query(queryText)
  }
}



export {
  DataContainer
}
