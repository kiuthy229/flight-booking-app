"use strict";
const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  SUPABASE_URL,
  SUPABASE_API_KEY,
} = process.env;

assert(PORT, "PORT is required");
assert(HOST, "HOST is required");
assert(SUPABASE_URL, "SUPABASE_URL is required");
assert(SUPABASE_API_KEY, "SUPABASE_API_KEY is required");

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  supabase: {
    url: SUPABASE_URL,
    apiKey: SUPABASE_API_KEY,
  },
};