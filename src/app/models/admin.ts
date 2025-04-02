export class Admin {
  _id: string; // ObjectId as string
  name: string;
  email: string;
  password: string;
  phone: string;
  password2: string;
  flag: boolean;

  constructor(
    _id: string = '',
    name: string = '',
    email: string = '',
    password: string = '',
    phone: string = '',
    password2: string = '',
    flag: boolean = true
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.password2 = password2;
    this.flag = flag;
  }
}