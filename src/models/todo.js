import bookshelf from '../db';
import User from './user';
import Tag from './tag';

const TABLE_NAME = 'todos';

/**
 * Todo model.
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

  tags() {
    return this.belongsToMany(Tag);
  }
}

export default Todo;
