import { Suspense } from "react";

import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  ProductCard,
  ProductCardSkeleton,
} from "@/component/product-card/ProductCard";
import { Button } from "@/component/ui/button";
import { cache } from "@/core/cache/cache";
import prisma from "@/core/db/db";

export default function HomePage() {
  const cachedMostPopularProducts = cache(
    getMostPopularProducts,
    ["/", "getMostPopularProducts"],
    { revalidate: DAY_IN_S },
  );
  const cachedNewestProducts = cache(
    getNewestProducts,
    ["/", "getNewestProducts"],
    { revalidate: DAY_IN_S },
  );

  return (
    <main className={"space-y-12"}>
      <ProductGridSection
        title={"Most popular"}
        productGetter={cachedMostPopularProducts}
      />
      <ProductGridSection
        title={"Newest"}
        productGetter={cachedNewestProducts}
      />
    </main>
  );

  async function getMostPopularProducts() {
    return prisma.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        orders: { _count: "desc" },
      },
      take: 6,
    });
  }

  async function getNewestProducts() {
    return prisma.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  }
}

type ProductGridSectionProps = {
  title: string;
  productGetter: () => Promise<Product[]>;
};

async function ProductGridSection({
  title,
  productGetter,
}: ProductGridSectionProps) {
  const products = await productGetter();

  return (
    <div className={"space-y-4"}>
      <div className={"flex gap-4 items-center"}>
        <h2>{title}</h2>
        <Button asChild>
          <Link href={"/products"}>
            <span>{"View All"}</span>
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
