"use strict";

const supabase = require("../../connection.js");

const getTickets = async (_, res) => {
  try {
    let { data, error } = await supabase.from('tickets').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getTicketById = async (req, res) => {
  try {
    let { data, error } = await supabase.from('tickets').select('*').eq('ticket_id', req.params.id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createTicket = async (req, res) => {
  try {
    const { data, error } = await supabase.from('tickets').insert([req.body]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const buyTicket = async (req, res) => {
  try {
    const { data, error } = await supabase.from('tickets').update(req.body).eq('ticket_id', req.params.id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  buyTicket,
};