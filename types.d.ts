type Product = {
  id: string;
  name: string;
  priceInCents: number;
  isAvailableForPurchase: boolean;
  _count: {
    orders: number;
  };
};
