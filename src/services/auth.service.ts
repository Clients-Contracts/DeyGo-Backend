import User, { I_Passenger } from '../models/passenger.model';
import bcrypt from 'bcryptjs';

export default class AuthService {
  static async register(data: any): Promise<I_Passenger> {
    const { name, email, phone, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();
    return newUser;
  }
}
