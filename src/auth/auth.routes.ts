import { Router } from 'express';
import { login, register } from './auth.controller';
import passport from 'passport';
const router = Router();

router.post('/register', register);
router.post('/login', login);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (_req, res) => res.redirect('/dashboard')
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (_req, res) => res.redirect('/dashboard')
);

// Apple OAuth
router.get('/apple', passport.authenticate('apple'));
router.get('/apple/callback', 
  passport.authenticate('apple', { failureRedirect: '/' }),
  (_req, res) => res.redirect('/dashboard')
);


export default router;
