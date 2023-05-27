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
  const { username, full_name, date_of_birth, phone_number, email, password } =
    req.body;
  const hashPassword = await Encrypt.cryptPassword(password);

  let insertQuery = `Insert into users(
      user_id, 
      username, 
      full_name, 
      date_of_birth, 
      phone_number, 
      email, 
      password)
      values (   ${Math.floor(Math.random() * 900000)}, 
                '${username}', 
                '${full_name}', 
                '${date_of_birth}',
                '${phone_number}',
                '${email}',
                '${hashPassword}')`;

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

const loginToUserAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    client.query(
      `Select * from users where email='${email}'`,
      async (err, results) => {
        if (!err) {
          if (results.rows.length > 0) {
            const user = results.rows[0];

            const isPasswordMatched = await Encrypt.comparePassword(
              password,
              user.password
            );

            if (isPasswordMatched) {
              res.send(user);
            } else {
              res.send({ message: "Password is incorrect" });
            }
          } else {
            res.send({ message: "No user with that email address" });
          }
        }
      }
    );
  } catch (error) {
    return error.message;
  }
};

const updateUserPassword = async (req, res) => {
  const { password } = req.body;
  const hashPassword = await Encrypt.cryptPassword(password);

  let updateQuery = `update users 
                    set password = '${hashPassword}' 
                    where user_id=${req.params.id}`;
  try {
    client.query(updateQuery, (err) => {
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
  loginToUserAccount,
  updateUserPassword,
};
