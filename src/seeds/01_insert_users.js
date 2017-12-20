import { encrypt } from '../utils/encrypt';

/**
 * Seed users table.
 *
 * @param  {object} knex
 * @param  {object} Promise
 * @return {Promise}
 */
export function seed(knex, Promise) {
  // Deletes all existing entries
  return knex('users')
    .del()
    .then(() => {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          name: 'Saugat Acharya',
          updated_at: new Date(),
          username: 'saugat',
          password: 'saugatbro',
          email: 'saugat@ad.com'
        }),
        knex('users').insert({
          name: 'Malla Dai',
          updated_at: new Date(),
          username: 'malla',
          password: 'mallabro',
          email: 'mall@ad.com'
        })
      ]);
    });
}
