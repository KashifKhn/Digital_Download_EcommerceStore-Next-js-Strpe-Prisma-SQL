import ProductCard from '@/components/ProductCard';
import { Product } from '@prisma/client';
import React from 'react'

type ProductSuspenseProps = {
  productsFetcher: () => Promise<Product[]>;
};



const ProductSuspense = async ({productsFetcher} : ProductSuspenseProps) => {
  return (await productsFetcher()).map(product => (
    <ProductCard  key={product.id} {...product} />
  ))
}

export default ProductSuspense