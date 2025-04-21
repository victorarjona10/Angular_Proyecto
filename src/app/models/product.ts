export class Product {
  _id: string; // ObjectId as string
  name: string;
  rating: number;
  description: string;
  price: number;

  constructor(
    _id: string = '',
    name: string = '',
    rating: number = 0,
    description: string = '',
    price: number = 0
  ) {
    this._id = _id;
    this.name = name;
    this.rating = rating;
    this.description = description;
    this.price = price;
  }
}