"use strict";

const supabase = require("../../connection.js");

let refreshTokens = [];

const getUsers = async (_, res) => {
  try {
    let { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    let { data, error } = await supabase.from('users').select('*').eq('user_id', req.params.id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').insert([req.body]);
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const loginToUserAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    let { data, error } = await supabase.from('users').select('*').eq('email', email).eq('password', password);
    if (error) throw error;
    if (data.length === 0) {
      res.status(401).send("Invalid credentials");
    } else {
      res.status(200).json(data[0]);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { user_id, newPassword } = req.body;
    const { data, error } = await supabase.from('users').update({ password: newPassword }).eq('user_id', user_id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginToUserAccount,
  updateUserPassword,
};