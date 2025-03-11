import User, { IUser } from '../user/user.model';
import * as bcrypt from "bcrypt"
export default class AuthService {
  static async register(data: any): Promise<IUser> {
    const { name, email, phone, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, phone, password: hashedPassword });
    await newUser.save();
    return newUser;
  }
}
