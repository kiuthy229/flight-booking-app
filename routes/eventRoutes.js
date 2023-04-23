"use strict";

const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

const { getEvents } = eventController;

router.get("/events", getEvents);

module.exports = {
  routes: router,
};
