"use strict";

const client = require("../connection.js");

const getUserById = async (req, res) => {
  try {
    client.query(
      `Select * from users where user_id=${req.params.id}`,
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

const createUser = async (req, res) => {
  const user = req.body;
  console.log(user);

  let insertQuery = `Insert into users(
      user_id, username, full_name, date_of_birth, phone_number, email, password)
      values (${123456}, '${user.username}', '${user.full_name}', '${
    user.date_of_birth
  }', '${user.phone_number}', '${user.email}', '${user.password}')`;
  try {
    client.query(insertQuery, (err) => {
      if (!err) {
        res.send(
          JSON.stringify({
            success: "Create new user successfully",
            status: 200,
          })
        );
      }
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getUserById,
  createUser,
};
