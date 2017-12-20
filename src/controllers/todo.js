import { Router } from 'express';
import HttpStatus from 'http-status-codes';
import * as todoService from '../services/todoServices';
import { findTodo } from '../validators/todoValidator';
import { validateToken } from '../validators/authValidator';

const router = Router();

/**
 * GET /api/todos
 */
router.get('/', validateToken, (req, res, next) => {
  todoService
    .getAllTodos(req.user_id)
    .then(data => {
      res.json({ data: data, pagination: data.pagination });
    })
    .catch(err => next(err));
});

router.get('/search', validateToken, (req, res, next) => {
  todoService
    .getSelectTodos(req.user_id, req.query.q)
    .then(data => {
      res.json({ data: data, pagination: data.pagination });
    })
    .catch(err => next(err));
});

/**
 * POST /api/todos
 */
router.post('/', validateToken, (req, res, next) => {
  todoService
    .createTodo(req.body, req.user_id)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * GET /api/todos/id
 */
router.get('/:id', validateToken, (req, res, next) => {
  todoService
    .getTodo(req.params.id)
    .then(data => res.status(HttpStatus.DELETED).json({ data }))
    .catch(err => next(err));
});

/**
 * DELETE /api/todos/id
 */
router.delete('/:id', validateToken, findTodo, (req, res, next) => {
  todoService
    .deleteTodo(req.params.id)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
});

/**
 * PUT /api/todos/id
 */
router.put('/:id', validateToken, findTodo, (req, res, next) => {
  todoService
    .updateTodo(req.params.id, req.body)
    .then(data => res.json({ data }))
    .catch(err => next(err));
});

export default router;
