"use client";

import { formatCurrency } from "@/lib/formatters";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Form from "./Form";

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCent: number;
    description: string;
  };
  clientSecret: string;
};

const CheckoutForm = ({ product, clientSecret }: CheckoutFormProps) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
  );

  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="flex gap-4 items-center">
        <div className="aspect-video flex-shrink-0 w-1/3 relative">
          <Image
            src={product.imagePath}
            fill
            alt={product.name}
            className="object-cover"
          />
        </div>
        <div>
          <div className="text-lg">
            {formatCurrency(product.priceInCent / 100)}
          </div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="line-clamp-3 text-muted-foreground">
            {product.description}
          </div>
        </div>
      </div>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret }}>
        <Form
          priceInCent={product.priceInCent}
          productId={product.id}
        />
      </Elements>
    </div>
  );
};

export default CheckoutForm;
