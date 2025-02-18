// types/express.d.ts
import { Request } from 'express';

// Define the structure of the decoded token (assuming it's a JWT)
interface DecodedToken {
  id: string;
  email: string;
}

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
