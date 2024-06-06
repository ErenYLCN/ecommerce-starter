"use client";

import { useState } from "react";

import { Product } from "@prisma/client";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Label } from "@/component/ui/label";
import { Textarea } from "@/component/ui/textarea";
import { formatCurrency } from "@/core/util/format/formatUtils";
import { getString } from "@/core/util/string/stringUtils";

import { addProduct, editProduct } from "../../_actions/product";

export default function ProductForm({
  product,
}: {
  product?: Nullable<Product>;
}) {
  const [error, action] = useFormState(
    product == null ? addProduct : editProduct.bind(null, product.id),
    {},
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents,
  );

  return (
    <form action={action} className={"mt-4 space-y-8"}>
      <div className={"space-y-2"}>
        <Label htmlFor={"name"}>{"Name"}</Label>
        <Input
          type={"text"}
          id={"name"}
          name={"name"}
          required
          defaultValue={getString(product?.name)}
        />
        {error.name && <div className={"text-destructive"}>{error.name}</div>}
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
        {error.priceInCents && (
          <div className={"text-destructive"}>{error.priceInCents}</div>
        )}
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"description"}>{"Description"}</Label>
        <Textarea
          id={"description"}
          name={"description"}
          required
          defaultValue={getString(product?.description)}
        />
        {error.description && (
          <div className={"text-destructive"}>{error.description}</div>
        )}
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"file"}>{"File"}</Label>
        <Input
          type={"file"}
          id={"file"}
          name={"file"}
          required={product === null}
        />
        {error.file && <div className={"text-destructive"}>{error.file}</div>}
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"image"}>{"Image"}</Label>
        <Input
          type={"file"}
          id={"image"}
          name={"image"}
          required={product === null}
        />
        {product !== undefined && product !== null && (
          <Image
            src={product.imagePath}
            alt={"Product Image"}
            width={100}
            height={100}
          />
        )}
        {error.image && <div className={"text-destructive"}>{error.image}</div>}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type={"submit"} disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
