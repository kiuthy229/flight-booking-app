"use strict";

const client = require("../connection.js");

const getTickets = async (_, res) => {
  try {
    client.query(`Select * from tickets`, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  } catch (error) {
    return error.message;
  }
};

const getTicketById = async (req, res) => {
  try {
    client.query(
      `Select * from tickets where ticket_id=${req.params.id}`,
      (err, result) => {
        if (!err) {
          res.send(result.rows);
        }
      }
    );
  } catch (error) {
    return error.message;
  }
};

const createTicket = async (req, res) => {
  const {
    transport_no,
    departure_date,
    origin,
    arrival_date,
    destination,
    stops,
    passenger_type,
    total_price,
    user_id,
  } = req.body;
  let insertQuery = `Insert into tickets(
    ticket_id, transport_no, departure_date, origin, arrival_date, destination, stops, passenger_type, total_price, user_id)
    values (${Math.floor(Math.random() * 10000)}, 
            '${transport_no}',
            '${departure_date}',
            '${origin}',
            '${arrival_date}',
            '${destination}',
            ${stops},
            '${passenger_type}',
            ${total_price},
            ${user_id})`;
  try {
    client.query(insertQuery, (err) => {
      if (!err) {
        res.send(
          JSON.stringify({ success: "Insertion was successful", status: 200 })
        );
      }
    });
  } catch (error) {
    return error.message;
  }
};

const buyTicket = async (req, res) => {
  const { ticket_id, user_id } = req.body;

  let updateQuery = `update tickets 
  set user_id = '${user_id}' 
  where ticket_id=${ticket_id}`;

  try {
    client.query(updateQuery, (err) => {
      if (!err) {
        res.send(
          JSON.stringify({ success: "buy ticket successfully", status: 200 })
        );
      }
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  buyTicket,
};
