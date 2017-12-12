import Boom from 'boom';
import Todo from '../models/todo';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllTodos() {
  return Todo.fetchAll({ withRelated: ['user'] });
}


/**
 * Get a todo
 *
 * @param {Number|String} id
 * @return {Promise}
 */
 export function getTodo(id) {
   return new Todo({ id }).fetch({withRelated: ['user']}).then(todo => {
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
  return new Todo({ task: todo.task, details: todo.details, user_id: todo.user_id }).save().then(todo => todo.refresh());
}

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
   return new Todo({ id }).save({task: todo.task, details: todo.details, user_id: todo.user_id}).then(todo => todo.refresh())
 }
