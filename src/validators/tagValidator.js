import Joi from 'joi';
import validate from '../utils/validate';
import * as tagService from '../services/tagService';

const SCHEMA = {
  task: Joi.string()
    .label('Name')
    .max(90)
    .required()
};

/**
 * Validate create/update tag request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function tagValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate tag existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findTag(req, res, next) {
  return tagService
    .getTodo(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findTag };
