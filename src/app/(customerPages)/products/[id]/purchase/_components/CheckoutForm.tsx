"use client";

import { formatCurrency } from "@/lib/formatters";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import Form from "./Form";
import { DiscountCodeType } from "@prisma/client";
import { getDiscountedAmount } from "@/lib/couponCodeHelpers";

type CheckoutFormProps = {
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
  clientSecret: string;
  couponCode?: {
    id: string;
    discountAmount: number;
    discountType: DiscountCodeType;
  };
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = ({
  product,
  clientSecret,
  couponCode,
}: CheckoutFormProps) => {
  const amount =
    couponCode == null
      ? product.priceInCents
      : getDiscountedAmount(couponCode, product.priceInCents);
  const isDiscounted = amount !== product.priceInCents;
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
          <div className="text-lg flex gap-4 items-baseline">
            <div
              className={
                isDiscounted ? "line-through text-muted-foreground text-sm" : ""
              }>
              {formatCurrency(product.priceInCents / 100)}
            </div>
            {isDiscounted && (
              <div className="">{formatCurrency(amount / 100)}</div>
            )}
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
          priceInCents={product.priceInCents}
          productId={product.id}
          couponCode={couponCode}
        />
      </Elements>
    </div>
  );
};

export default CheckoutForm;
