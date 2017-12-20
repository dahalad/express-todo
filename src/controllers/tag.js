import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as tagService from '../services/tagService';
import { findTag } from '../validators/tagValidator';

const router = Router();

/**
 * GET /api/tags
 * Gets all tags
 */
router.get('/', (req, res, next) => {
  tagService
    .getAllTags()
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * POST /api/tags
 * Create a new tag
 */
router.post('/', (req, res, next) => {
  tagService
    .createTag(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/tags/id
 * GEt tag of given ID
 */
router.get('/:id', (req, res, next) => {
  tagService
    .getTag(req.params.id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/tags/id
 * Delete Tag of given ID
 */
router.delete('/:id', findTag, (req, res, next) => {
  tagService
    .deleteTag(req.params.id)
    .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
    .catch(err => next(err));
});

export default router;
