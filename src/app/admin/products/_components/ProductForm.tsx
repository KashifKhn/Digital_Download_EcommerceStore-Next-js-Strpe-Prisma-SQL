"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react";
import { addProducts } from "../../_actions/products";

const ProductForm = () => {
  const [priceInCents, setPriceInCents] = useState<number>(0);
  return (
    <>
      <form action={addProducts} className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input name="name" id="name" type="text" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="priceInCents">Price in Cents</Label>
          <Input
            name="priceInCents"
            id="priceInCents"
            type="number"
            value={priceInCents}
            onChange={(e) => setPriceInCents(Number(e.target.value))}
            required
          />

          <p className="text-muted-foreground">
            {" "}
            {formatCurrency((priceInCents || 0) / 100)}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" id="description" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">File</Label>
          <Input name="file" id="file" type="file" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image</Label>
          <Input name="image" id="image" type="file" required />
        </div>
        <Button type="submit">Add Your Products</Button>
      </form>
    </>
  );
};

export default ProductForm;
