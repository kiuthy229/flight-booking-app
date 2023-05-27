"use strict";

const ticketData = require("../data/tickets");

const getTickets = async (req, res) => {
  try {
    await ticketData.getTickets(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTicketById = async (req, res) => {
  try {
    await ticketData.getTicketById(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createTicket = async (req, res) => {
  try {
    await ticketData.createTicket(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
};
