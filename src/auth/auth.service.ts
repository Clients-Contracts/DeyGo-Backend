import Passenger, { I_Passenger } from '../passenger/passenger.model';
import * as bcrypt from "bcrypt"
export default class AuthService {
  static async register(data: any): Promise<I_Passenger> {
    const { name, email, phone, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newpassenger = new Passenger({ name, email, phone, password: hashedPassword });
    await newpassenger.save();
    return newpassenger;
  }
}
