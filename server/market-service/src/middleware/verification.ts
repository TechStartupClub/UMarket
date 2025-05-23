import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}

interface User {
  google_id: string;
  display_name: string;
  email: string;
}

interface DecodedUser extends User {
  iat?: number;
  exp?: number;
}

export const verifyToken =
    (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.token

      if (!token) {
        res.status(401).json({message: 'Unauthorized user'});
        return;
      }

      try {
        const user =
            jwt.verify(token, process.env.JWT_SECRET as string) as DecodedUser;
        req.user = user;
        next()
      } catch {
        res.status(401).json({message: 'Invalid token'});
      }
    }

export default verifyToken