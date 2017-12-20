import * as authService from '../services/authService';
import Boom from 'boom';

function validateToken(req, res, next) {
  // console.log(req.headers.authorization.substring(7));
  // console.log(req);
  if (req.headers.type === 'access') {
    let id = authService.verifyAccessToken(req.headers.authorization.substring(7));
    if (id) {
      req.user_id = id;
      next();
    } else {
      throw new Boom.forbidden('Not Authorized');
    }
  } else if (req.headers.type === 'refresh') {
    let newAccessToken = authService.verifyRefreshToken(req.headers.authorization.substring(7));
    next(res.json(newAccessToken));
  }
}

export { validateToken };
