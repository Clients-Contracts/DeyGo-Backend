import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class AuthService {
  static async register(data: any): Promise<IUser> {
    const { name, email, phone, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();
    return newUser;
  }
}
