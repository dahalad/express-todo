import Boom from 'boom';
import User from '../models/user';
import Token from '../models/token';

const jwt = require('jsonwebtoken');

/**
 * Log In User
 */
export function authenticate(data) {
  return new User({ username: data.username }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    } else if (user.attributes.password !== data.password) {
      throw new Boom.notFound('Wrong Password or Username');
    }
    let refreshToken = jwt.sign({ id: user.id }, 'BadCompany', { expiresIn: 60 * 60 * 9 });
    let t = new Token({ value: refreshToken, user_id: user.id }).save().then(token => token.refresh());

    return {
      acessToken: jwt.sign({ id: user.id }, 'MalPractice', { expiresIn: 60 * 60 * 6 }),
      refreshToken: refreshToken
    };
  });
}

/*
 * Log user out and delete refresh token from database
 */
export function logout(id) {
  return new Token({ user_id: id }).fetch().then(token => token.destroy());
}

export function verifyAccessToken(token) {
  try {
    let result = jwt.verify(token, 'MalPractice');
    if (result) {
      return result.id;
    } else {
      return false;
    }
  } catch (err) {
    throw Boom.unauthorized(err + ' token expired?');
  }
}

export function verifyRefreshToken(token) {
  try {
    let t = Token.where({ value: token });
  } catch (err) {
    console.log(err);
  } finally {
    let result = jwt.verify(token, 'BadCompany');
    if (result) {
      return jwt.sign({ id: result.id }, 'MalPractice', { expiresIn: 60 * 60 * 2 });
    }
  }
}
