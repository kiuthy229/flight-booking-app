"use strict";

const fs = require("fs-extra");

const { json } = require("path");

const loadSqlSeries = async (folderName) => {
  const filePath = join(process.cwd(), "data", folderName);
  const sqlFiles = await fs.readdir(filePath);
  const queries = {};

  for (const sqlFile of sqlFiles) {
    const query = await fs.readFileSync(join(filePath, sqlFile), {
      encoding: "UTF-8",
    });
    queries[(sqlFiles.replace(".sql"), "")] = query;
  }

  return queries
};

module.exports = {
    loadSqlSeries
}
