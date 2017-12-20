const bcrypt = require('bcrypt');
const saltRounds = 10;

export function encrypt(password) {
  bcrypt.hash(password, saltRounds, function(err, hash) {
    return hash;
  });
}
