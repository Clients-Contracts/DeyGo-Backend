import { Request, Response } from 'express';
import AuthService from './auth.service';

export const register = async (req: Request, res: Response) => {
    try {
      const passenger = await AuthService.register(req.body);
      res.status(201).json(passenger);
    } catch (error) {
      const err = error as Error;  // 👈 Explicitly cast as Error
      res.status(500).json({ error: err.message });
    }
  };
  