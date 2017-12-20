/**
 * Create users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function up(knex) {
  return knex.schema
    .createTable('tags', table => {
      table.increments();
      table.string('name').notNull();
    })
    .createTable('tags_todos', table => {
      table
        .integer('tag_id')
        .references('tags.id')
        .onDelete('CASCADE');
      table
        .integer('todo_id')
        .references('todos.id')
        .onDelete('CASCADE');
    });
}

/**
 * Drop users table.
 *
 * @param  {object} knex
 * @return {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable('tags').dropTable('tags_todos');
}
