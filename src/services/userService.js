import Boom from 'boom';
import User from '../models/user';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers(user_id) {
  return User.where({ id: user_id }).fetchAll({ withRelated: ['todos'] });
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch({ withRelated: ['todos'] }).then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  return new User({
    name: user.name,
    password: user.password,
    username: user.username
  })
    .save()
    .then(user => user.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id })
    .save({
      name: user.name,
      username: user.username,
      password: user.password
    })
    .then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}
