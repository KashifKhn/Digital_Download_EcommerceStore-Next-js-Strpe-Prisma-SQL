import DashboardCard from "@/app/admin/_components/DashboardCard";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";
import OrdersByDayChart from "./_components/charts/OrdersByDayChart";
import { getRangeOption, RANGE_OPTIONS } from "@/lib/rangeOptions";
import ChartCard from "./_components/ChartCard";
import UsersByDayChart from "./_components/charts/UsersByDayChart";
import RevenueByProductChart from "./_components/charts/RevenueByProductChart";
import {
  getProductData,
  getSalesData,
  getUserData,
} from "@/services/admin/dashboardService";

type AdminDashboardProps = {
  searchParams: {
    totalSalesRange?: string;
    totalSalesRangeFrom?: string;
    totalSalesRangeTo?: string;
    newCustomersRange?: string;
    newCustomersRangeFrom?: string;
    newCustomersRangeTo?: string;
    revenueByProductRange?: string;
    revenueByProductRangeFrom?: string;
    revenueByProductRangeTo?: string;
  };
};

const AdminDashboard = async ({
  searchParams: {
    totalSalesRange,
    totalSalesRangeFrom,
    totalSalesRangeTo,
    newCustomersRange,
    newCustomersRangeFrom,
    newCustomersRangeTo,
    revenueByProductRange,
    revenueByProductRangeFrom,
    revenueByProductRangeTo,
  },
}: AdminDashboardProps) => {
  const totalSalesRangeOption =
    getRangeOption(totalSalesRange, totalSalesRangeFrom, totalSalesRangeTo) ||
    RANGE_OPTIONS.last_7_days;
  const newCustomersRangeOption =
    getRangeOption(
      newCustomersRange,
      newCustomersRangeFrom,
      newCustomersRangeTo
    ) || RANGE_OPTIONS.last_7_days;
  const revenueByProductRangeOption =
    getRangeOption(
      revenueByProductRange,
      revenueByProductRangeFrom,
      revenueByProductRangeTo
    ) || RANGE_OPTIONS.all_time;

  const [salesData, userData, productData] = await Promise.all([
    getSalesData(
      totalSalesRangeOption.startDate,
      totalSalesRangeOption.endDate
    ),
    getUserData(
      newCustomersRangeOption.startDate,
      newCustomersRangeOption.endDate
    ),
    getProductData(
      revenueByProductRangeOption.startDate,
      revenueByProductRangeOption.endDate
    ),
  ]);
  return (
    <>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <ChartCard
          title="Total Sales"
          queryKey="totalSalesRange"
          selectedRangeLabel={totalSalesRangeOption.label}>
          <OrdersByDayChart data={salesData.chartData} />
        </ChartCard>
        <ChartCard
          title="New Customers"
          queryKey="newCustomersRange"
          selectedRangeLabel={newCustomersRangeOption.label}>
          <UsersByDayChart data={userData.chartData} />
        </ChartCard>
        <ChartCard
          title="Revenue By Product"
          queryKey="revenueByProductRange"
          selectedRangeLabel={revenueByProductRangeOption.label}>
          <RevenueByProductChart data={productData.chartData} />
        </ChartCard>
      </div>
    </>
  );
};

export default AdminDashboard;
