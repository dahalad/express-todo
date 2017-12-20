import bookshelf from '../db';
import User from './user';

const TABLE_NAME = 'tokens';

/**
 * Token model.
 */
class Token extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  user() {
    return this.belongsTo(User);
  }
}

export default Token;
