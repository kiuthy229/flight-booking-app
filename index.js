"use strict";

const express = require("express");
const config = require("./config");
const cors = require("cors");
const bodyParser = require("body-parser");
const ticketController = require("./controllers/ticketController");
const userController = require("./controllers/userController");

const { getTickets, getTicketById, createTicket } = ticketController;
const { getUserById, createUser } = userController;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(config.port, () =>
  console.log("Server is listening on http://localhost:" + config.port)
);

app.get("/tickets", getTickets);

app.get("/ticket/:id", getTicketById);

app.post("/tickets", createTicket);

app.get("/user/:id", getUserById);

app.post("/users", createUser);
