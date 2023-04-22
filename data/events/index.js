"use strict";

const utils = require("../utils");
const config = require("../../config");
const sql = require("mssql");

const getEvents = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlSeries("events");
    const list = await pool.request().query(sqlQueries.eventsList);

    return list.recordset;
  } catch (error) {
    return error.message;
  }
};
