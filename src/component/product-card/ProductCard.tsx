import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/core/util/format/formatUtils";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}: Product) {
  return (
    <Card className={"flex overflow-hidden flex-col"}>
      <div className={"relative w-full h-auto aspect-video"}>
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className={"flex-grow"}>
        <p className={"line-clamp-4"}>{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size={"lg"} className={"w-full"}>
          <Link href={`/products/${id}/purchase`}>{"Purchase"}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
