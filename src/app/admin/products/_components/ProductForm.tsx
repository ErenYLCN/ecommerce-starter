"use client";

import { useState } from "react";

import { useFormStatus } from "react-dom";

import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import { Textarea } from "@/component/ui/textarea";
import { formatCurrency } from "@/core/util/format/formatUtils";

import { addProduct } from "../../_actions/product";

export default function ProductForm() {
  const [priceInCents, setPriceInCents] = useState<number>();

  return (
    <form action={addProduct} className={"mt-4 space-y-8"}>
      <div className={"space-y-2"}>
        <Label htmlFor={"name"}>{"Name"}</Label>
        <Input type={"text"} id={"name"} name={"name"} required />
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"priceInCents"}>{"Price in cents"}</Label>
        <Input
          type={"number"}
          id={"priceInCents"}
          name={"priceInCents"}
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          required
        />
        <div className={"text-muted-foreground"}>
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"description"}>{"Description"}</Label>
        <Textarea id={"description"} name={"description"} required />
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"file"}>{"File"}</Label>
        <Input type={"file"} id={"file"} name={"file"} required />
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"image"}>{"Image"}</Label>
        <Input type={"file"} id={"image"} name={"image"} required />
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type={"submit"}>{pending ? "Saving..." : "Save"}</Button>;
}
