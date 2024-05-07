export type ProductProps = {
  price: number;
  name: string;
  _id: string;
  description: string;
  image: string;
  vendor: {
    store_name: string;
    store_image: string;
  };
};
