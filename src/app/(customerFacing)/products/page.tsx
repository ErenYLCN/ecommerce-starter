import { Suspense } from "react";

import {
  ProductCard,
  ProductCardSkeleton,
} from "@/component/product-card/ProductCard";
import { cache } from "@/core/cache/cache";
import { DAY_IN_S } from "@/core/constant/time/timeConstants";
import prisma from "@/core/db/db";

export default function ProductsPage() {
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductsSuspense />
      </Suspense>
    </div>
  );
}

async function ProductsSuspense() {
  const cachedProducts = await cache(
    () =>
      prisma.product.findMany({
        where: {
          isAvailableForPurchase: true,
        },
        orderBy: {
          name: "asc",
        },
      }),
    ["/products", "products"],
    {
      revalidate: DAY_IN_S,
    },
  )();

  return cachedProducts.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
