import { Request, Response } from "express";
import Admin from "./admin.model";
import * as adminServices from "./admin.service"
import jwt from "jsonwebtoken";

// Authentication Management
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password,
      role,
    });

    await newAdmin.save();

    // Exclude password from response
    const adminData = newAdmin.toObject();
    delete adminData.password;

    res.status(201).json({
      message: "Admin registered successfully",
      admin: adminData,
    });
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};


export const loginAdmin = async (req: Request, res: Response) => {
  try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await Admin.findOne({ email });
        if (!user) {
           res.status(401).json({ message: 'Invalid credentials' });
           return
        }
        
        // Check if user has a password (might be Google-only user)
        if (!user.password) {
           res.status(401).json({ message: 'Please sign in with Google' });
        }
        
        // Verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          res.status(401).json({ message: 'Invalid credentials' });
        }
        
        // Check if user is an admin
        if (user.role !== 'admin' && user.role !== 'superadmin') {
          res.status(403).json({ message: 'Not authorized as admin' });
        }
        
        // Create JWT token
        const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET as string,
          { expiresIn: '24h' }
        );
        
        res.status(200).json({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.picture,
          token
        });
       

    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "", error });
  }
};


export const googleVerification = async (req: Request, res: Response) => {
    try {
      const { email, name, googleId, picture } = req.body;
      
      // Find user by email
      let admin = await Admin.findOne({ email });
      
      // If admin doesn't exist, check if we should create one
      if (!admin) {
        // Check if this is a domain allowed for auto-creation
        // Adjust this logic based on your requirements
        const domain = email.split('@')[1];
        const allowedDomains = (process.env.ALLOWED_ADMIN_DOMAINS || '').split(',');
        
        if (!allowedDomains.includes(domain)) {
          res.status(403).json({ message: 'Domain not authorized for admin access' });
        }
        
        // Create new admin with admin role
        admin = new Admin({
          name,
          email,
          googleId,
          picture,
          role: 'admin' // Default role for new Google admins
        });
        
        await admin.save();
      } else {
        // Update existing admin's Google info
        admin.googleId = googleId;
        admin.picture = picture;
        await admin.save();
      }
      
      // Check if admin is an admin
      if (admin.role !== 'admin' && admin.role !== 'superadmin') {
        res.status(403).json({ message: 'Not authorized as admin' });
      }
      
      // Create JWT token
      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '24h' }
      );
      
      res.status(200).json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        image: admin.picture,
        token
      });
    } catch (error) {
      console.error('Google verification error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }


// Drivers' management
export const fetchDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await adminServices.allDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const getDriver = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const approveDriver = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const rejectDriver = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

//Profile management
export const fetchAdminData = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};

export const updateAdminData = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "", error });
  }
};


//Reports Management

//Disputes Management

//Pricing Management
