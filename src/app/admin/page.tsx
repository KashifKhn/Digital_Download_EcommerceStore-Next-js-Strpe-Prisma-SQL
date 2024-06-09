import DashboardCard from "@/app/admin/_components/DashboardCard";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
};

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    await db.user.count(),
    await db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount: userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
};

const AdminDashboard = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        subTitle={`${formatNumber(salesData.numberOfSales)} Orders`}
        body={formatCurrency(salesData.amount)}
      />

      <DashboardCard
        title="Customers"
        subTitle={`${formatCurrency(
          userData.averageValuePerUser
        )} Average value`}
        body={formatNumber(userData.userCount)}
      />

      <DashboardCard
        title="Active Products"
        subTitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

export default AdminDashboard;
