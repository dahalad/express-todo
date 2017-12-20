/**
 * Create tokens table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema.createTable('tokens', table => {
    table.increments();
    table.string('value').notNull();
    table
      .integer('user_id')
      .notNull()
      .references('users.id');
  });
}

/**
 * Drop tokens table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tokens');
}
