"use strict";

const userData = require("../data/users");

const getUsers = async (req, res) => {
  try {
    await userData.getUsers(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    await userData.getUserById(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    await userData.createUser(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserPassword = async (req, res) => {
  try {
    await userData.updateUserPassword(req, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserPassword,
};
