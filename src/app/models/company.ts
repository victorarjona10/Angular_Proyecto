export class Company {
  _id: string; // ObjectId as string
  name: string;
  rating: number;
  description: string;
  location: string;
  email: string;
  phone: string;
  password: string;
  wallet: number;
  products: string[]; // Array of ObjectId as strings

  constructor(
    _id: string = '',
    name: string = '',
    rating: number = 0,
    description: string = '',
    location: string = '',
    email: string = '',
    phone: string = '',
    password: string = '',
    wallet: number = 0,
    products: string[] = []
  ) {
    this._id = _id;
    this.name = name;
    this.rating = rating;
    this.description = description;
    this.location = location;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.wallet = wallet;
    this.products = products;
  }
}