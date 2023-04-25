"use strict";

const client = require("../connection.js");
const Encrypt = require("../../utils/encrypt.js");

const getUsers = async (_, res) => {
  try {
    client.query(`Select * from users`, (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    });
  } catch (error) {
    return error.message;
  }
};

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
  const hashPassword = await Encrypt.cryptPassword(user.password);

  let insertQuery = `Insert into users(
      user_id, 
      username, 
      full_name, 
      date_of_birth, 
      phone_number, 
      email, 
      password)
      values (   ${Math.floor(Math.random() * 900000)}, 
                '${user.username}', 
                '${user.full_name}', 
                '${user.date_of_birth}',
                '${user.phone_number}',
                '${user.email}',
                '${hashPassword}')`;

  try {
    client.query(insertQuery, (err, response) => {
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

const updateUserPassword = async (req, res) => {
  const user = req.body;
  const hashPassword = await Encrypt.cryptPassword(user.password);

  let insertQuery = `update users 
                    set password = '${hashPassword}' 
                    where user_id=${req.params.id}`;
  try {
    client.query(insertQuery, (err) => {
      if (!err) {
        res.send(
          JSON.stringify({
            success: "Password has been changed successfully",
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
  getUsers,
  getUserById,
  createUser,
  updateUserPassword,
};
