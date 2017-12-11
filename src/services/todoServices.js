import Boom from 'boom';
import Todo from '../models/todo';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll();
}

// /**
//  * Get a user.
//  *
//  * @param  {Number|String}  id
//  * @return {Promise}
//  */
// export function getUser(id) {
//   return new User({ id }).fetch().then(user => {
//     if (!user) {
//       throw new Boom.notFound('User not found');
//     }
//
//     return user;
//   });
// }

/**
 * Get a todo
 *
 * @param {Number|String} id
 * @return {Promise}
 */
 export function getTodo(id) {
   return new Todo({ id }).fetch().then(todo => {
     if (!todo) {
       throw new Boom.notFound('Todo not found');
     }

     return todo;
   });
 }


/**
 * Create new user.
 *
 * @param  {Object}  todo
 * @return {Promise}
 */
export function createTodo(todo) {
  return new Todo({ task: todo.task, details: todo.details }).save().then(todo => todo.refresh());
}

// /**
//  * Update a user.
//  *
//  * @param  {Number|String}  id
//  * @param  {Object}         user
//  * @return {Promise}
//  */
// export function updateUser(id, user) {
//   return new User({ id }).save({ name: user.name }).then(user => user.refresh());
// }

/**
 * Delete a todos
 *
 * @param {Number|String} id
 * @return {Promise}
 */
 export function deleteTodo(id) {
   return new Todo({ id }).fetch().then(todo => todo.destroy());
 }


/**
 * Update a todos
 *
 * @param {Number|String} id
 * @param {Todo}
 * @return {Promise}
 */
 export function updateTodo(id, todo) {
   return new Todo({ id }).save({task: todo.task, details: todo.details}).then(todo => todo.refresh())
 }
