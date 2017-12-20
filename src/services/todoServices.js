import Boom from 'boom';
import Todo from '../models/todo';

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllTodos(user_id) {
  return Todo.where({ user_id: user_id }).fetchPage({ withRelated: ['user', 'tags'] });
}

export function getSelectTodos(user_id, q) {
  return Todo.query(qb => {
    qb
      .where({ user_id: user_id })
      .where('details', 'LIKE', '%' + q + '%')
      .orWhere('task', 'LIKE', '%' + q + '%');
  }).fetchPage({ withRelated: ['tags', 'users'] });
}

/**
 * Get a todo
 *
 * @param {Number|String} id
 * @return {Promise}
 */
export function getTodo(id) {
  return new Todo({ id }).fetch({ withRelated: ['user', 'tags'] }).then(todo => {
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
export function createTodo(todo, user_id) {
  let tag = parseInt(todo.tags || 3);

  return new Todo({ task: todo.task, details: todo.details, user_id: user_id }).save().then(todo => {
    todo.tags().attach([tag]);

    return todo.refresh();
  });
}

/**
 * Delete a todos
 *
 * @param {Number|String} id
 * @return {Promise}
 */
export function deleteTodo(id) {
  return new Todo({ id })
    .destroy()
    .then(() => {})
    .catch(err => console.log(err));
}

/**
 * Update a todos
 *
 * @param {Number|String} id
 * @param {Todo}
 * @return {Promise}
 */
export function updateTodo(id, todo) {
  let tag = parseInt(todo.tags || 2);

  return new Todo({ id }).save({ task: todo.task, details: todo.details, user_id: todo.user_id }).then(todo => {
    todo.tags().attach([tag]);
  });
}
