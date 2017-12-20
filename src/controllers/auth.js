import { Router } from 'express';
import * as authService from '../services/authService';
import { validateToken } from '../validators/authValidator';

const router = Router();

router.post('/login', (req, res, next) => {
  authService
    .authenticate(req.body)
    .then(data => res.send({ data }))
    .catch(err => next(err));
});

router.get('/logout', validateToken, (req, res, next) => {
  authService
    .logout(req.user_id)
    .then(data => {
      res.send({ data });
    })
    .catch(err => next(err));
});

export default router;
