import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import { findUser, userValidator } from '../validators/userValidator';
import { validateToken } from '../validators/authValidator';
import Boom from 'boom';

const router = Router();

/**
 * GET /api/users
 */
router.get('/', validateToken, (req, res, next) => {
  userService
    .getAllUsers(req.user_id)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/users/:id
 */
router.get('/:id', validateToken, (req, res, next) => {
  if (req.params.id == req.user_id) {
    userService
      .getUser(req.params.id)
      .then(data => res.json({ data }))
      .catch(err => next(err));
  } else {
    throw Boom.forbidden('You cannot perform this');
  }
});

/**
 * POST /api/users
 */
router.post('/register', userValidator, (req, res, next) => {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/users/:id
 */
router.put('/:id', validateToken, findUser, userValidator, (req, res, next) => {
  if (req.params.id == req.user_id) {
    userService
      .updateUser(req.params.id, req.body)
      .then(data => res.json({ data }))
      .catch(err => next(err));
  }
});

/**
 * DELETE /api/users/:id
 */
router.delete('/:id', validateToken, findUser, (req, res, next) => {
  if (req.params.id == req.user_id) {
    userService
      .deleteUser(req.params.id)
      .then(data => res.status(HttpStatus.NO_CONTENT).json({ data }))
      .catch(err => next(err));
  }
});

export default router;
