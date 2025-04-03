export class Order {
  _id?: string; // ObjectId as string
  user_id: string; // ObjectId as string
  products: {
    product_id: string; // ObjectId as string
    quantity: number;
  }[];
  orderDate: Date;
  status: "Pendiente" | "Enviado" | "Entregado" | "Cancelado";

  constructor(
    _id: string = '',
    user_id: string = '',
    products: { product_id: string; quantity: number }[] = [],
    orderDate: Date = new Date(),
    status: "Pendiente" | "Enviado" | "Entregado" | "Cancelado" = "Pendiente"
  ) {
    this._id = _id;
    this.user_id = user_id;
    this.products = products;
    this.orderDate = orderDate;
    this.status = status;
  }
}