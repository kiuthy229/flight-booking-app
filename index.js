"use strict";

const express = require("express");
const config = reuiqre("./config");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(config.port, () =>
  console.log("Server is listening on http://localhost" + config.port)
);
