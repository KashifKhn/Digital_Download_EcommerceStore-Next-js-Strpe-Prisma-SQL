"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProducts } from "../../_actions/products";
import { useFormState } from "react-dom";
import SubmitButton from "../../_components/SubmitButton";

const ProductForm = () => {
  const [error, actions] = useFormState(addProducts, {});
  const [priceInCents, setPriceInCents] = useState<number | undefined>();
  return (
    <>
      <form action={actions} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" type="text" required />
          {error?.name && (
            <p className="text-destructive" role="alert">
              {error.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price in Cents</Label>
          <Input
            name="priceInCents"
            id="priceInCents"
            type="number"
            value={priceInCents}
            onChange={(e) =>
              setPriceInCents(Number(e.target.value) || undefined)
            }
            required
          />

          <p className="text-muted-foreground">
            {" "}
            {formatCurrency((priceInCents || 0) / 100)}
          </p>
          {error?.priceInCents && (
            <p className="text-destructive" role="alert">
              {error.priceInCents}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" required />
          {error?.description && (
            <p className="text-destructive" role="alert">
              {error.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input name="file" id="file" type="file" required />
          {error?.file && (
            <p className="text-destructive" role="alert">
              {error.file}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input name="image" id="image" type="file" required />
          {error?.image && (
            <p className="text-destructive" role="alert">
              {error.image}
            </p>
          )}
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default ProductForm;
