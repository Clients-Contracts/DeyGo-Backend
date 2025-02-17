import { JwtPayload } from 'jsonwebtoken';
import { IAdmin, IDriver, IPassenger } from 'types';

declare global {
  namespace Express {
    interface Request {
      passenger?: IPassenger | JwtPayload;
      driver?: IDriver | JwtPayload;
      admin?: IAdmin | JwtPayload
    }
  }
}
