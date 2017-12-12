import bookshelf from '../db';
import User from './user';

const TABLE_NAME = 'todos';

/**
 * User model.
 */
class Todo extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo(User);
  }
}

export default Todo;
