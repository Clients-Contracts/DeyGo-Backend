import User, { IUser } from "../user/user.model";
import * as bcrypt from "bcrypt";
import Driver, { IDriver } from "../driver/driver.model";
import jwt from "jsonwebtoken";
import Passenger, { IPassenger } from "../passenger/passenger.model";

interface IResponse {
  token?: string;
  data?: IUser | IDriver | IPassenger;
  message: string
}

interface RegisterDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "driver" | "passenger"

}

export default class AuthService {
  static async register(data: RegisterDto): Promise<IResponse> {
    const { name, email, phoneNumber, password, role } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;
    switch (role) {
      case "driver":
        newUser = new Driver({ name,  email, phoneNumber, password: hashedPassword });
        break;
      case "passenger":
        newUser = new Passenger({ name,  email, phoneNumber, password: hashedPassword });
        break;
    }

    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );
    return { token, data: newUser, message: "User created successfully" };
  }

  static async login(email: string, password: string): Promise<IResponse> {
    const user = await User.findOne({ email });
    if (!user) throw new Error("user not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      }
    );
    return {token, message: "Login successful", data: user};
  }
}
