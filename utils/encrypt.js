const bcrypt = require("bcrypt");
const saltRounds = 10;

const Encrypt = {
  cryptPassword: (password) =>
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => hash),

  comparePassword: (password, hashPassword) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};

module.exports = Encrypt;
