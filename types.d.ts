type Product = {
  id: string;
  name: string;
  priceInCent: number;
  isAvailableForPurchase: boolean;
  _count: {
    Order: number;
  };
};
