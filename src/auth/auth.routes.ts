import { Router } from 'express';
import { login, register } from './auth.controller';
import passport from 'passport';
import jwt from "jsonwebtoken"

const router = Router();

router.post('/register', register);
router.post('/login', login);



// Google authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      const user = req.user as any;
      
      // Create JWT token
      const token = jwt.sign(
        { 
          id: user._id, 
          email: user.email,
          name: user.name,
          role: user.role,
          picture: user.picture
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );
      
      // Set JWT token in cookie
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      // Sync with NextAuth.js session
      // This is important - we need to make NextAuth aware of the successful login
      const response = await fetch(`${process.env.FRONTEND_URL}/api/auth/callback/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: token,
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.picture
          }
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync session with NextAuth');
      }
      
      // Redirect to dashboard
      res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
    } catch (error) {
      console.error('Google callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=AuthenticationFailed`);
    }
  }
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
