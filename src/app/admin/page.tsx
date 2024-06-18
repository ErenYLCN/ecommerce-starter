import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import prisma from "@/core/db/db";
import { formatCurrency, formatNumber } from "@/core/util/format/formatUtils";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: {
      priceInCents: true,
    },
    _count: true,
  });

  return {
    amount: (data._sum.priceInCents || 0) / 100,
    numberOfSales: data._count,
  };
}

async function getUserData() {
  const [userCount, orderData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: {
        priceInCents: true,
      },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.priceInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [numOfAvailableProducts, numOfUnavailableProducts] = await Promise.all([
    prisma.product.count({
      where: {
        isAvailableForPurchase: true,
      },
    }),
    prisma.product.count({
      where: {
        isAvailableForPurchase: false,
      },
    }),
  ]);

  return {
    numOfAvailableProducts,
    numOfUnavailableProducts,
  };
}

export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  const { amount: totalAmountOfSales, numberOfSales } = salesData;
  const { userCount, averageValuePerUser } = userData;

  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
      <DashboardCard
        title={"Sales"}
        subtitle={`Number of sales: ${formatNumber(numberOfSales)}`}
        body={`Total amount of sales: ${formatCurrency(totalAmountOfSales)}`}
      />
      <DashboardCard
        title={"Users"}
        subtitle={`Average value per user ${formatCurrency(averageValuePerUser)}`}
        body={`Total amount of user: ${formatNumber(userCount)}`}
      />
      <DashboardCard
        title={"Produts"}
        subtitle={`Available products: ${formatNumber(productData.numOfAvailableProducts)}`}
        body={`Unavailable products: ${formatNumber(productData.numOfUnavailableProducts)}`}
      />
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
}
