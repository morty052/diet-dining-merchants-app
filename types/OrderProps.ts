import { ProductProps } from "./ProductProps";

export type OrderProps = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  status: {
    pending: boolean;
    completed: boolean;
    cancelled: boolean;
    waiting: boolean;
  };
  location: string;
  _rev: string;
  _type: string;
  products: {
    quantity: number;
    image: string;
    name: string;
    price: number;
  }[];
  total: number;
};
