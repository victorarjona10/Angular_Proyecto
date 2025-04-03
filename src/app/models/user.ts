export class User {
  _id: string; // ObjectId as string
  name: string;
  email: string;
  password: string;
  phone: string;
  wallet: number;
  Flag: boolean;
  description?: string;
  avatar?: string;

  constructor(
    _id: string = '',
    name: string = '',
    email: string = '',
    password: string = '',
    phone: string = '',
    wallet: number = 0,
    Flag: boolean = true,
    description?: string,
    avatar?: string
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.wallet = wallet;
    this.Flag = Flag;
    this.description = description;
    this.avatar = avatar;
  }
}