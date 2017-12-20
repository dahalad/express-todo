import Boom from 'boom';
import Tag from '../models/tag';

/*
 * Get all tags
 */
export function getAllTags() {
  return Tag.fetchAll({ withRelated: ['todos'] });
}

/*
 * Get tag by Id
 */
export function getTag(id) {
  return new Tag({ id }).fetch({ withRelated: ['todos'] }).then(tag => {
    if (!tag) {
      throw new Boom.notFound('Todo not found');
    }

    return tag;
  });
}

/*
 * Create a New Tag
 */
export function createTag(tag) {
  return new Tag({ name: tag.name }).save().then(tag => tag.refresh());
}

/*
 * Delete a Tag
 */
export function deleteTag(id) {
  return new Tag({ id }).fetch().then(tag => tag.destroy());
}
