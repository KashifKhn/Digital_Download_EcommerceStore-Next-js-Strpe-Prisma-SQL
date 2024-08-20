import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfWeek,
  interval,
  max,
  min,
  startOfDay,
  startOfWeek,
} from "date-fns";
import db from "@/db/db";
import { Prisma } from "@prisma/client";
import { formatDate } from "../formatters";

const getSalesData = async (
  createdAfter: Date | null,
  createdBefore: Date | null
) => {
  const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [data, chartData] = await Promise.all([
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
      _count: true,
    }),
    db.order.findMany({
      select: { createdAt: true, pricePaidInCents: true },
      where: { createdAt: createdAtQuery },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const { array, format } = getChartDateArray(
    createdAfter || startOfDay(chartData[0].createdAt),
    createdBefore || new Date()
  );

  const dayArray = array.map((date) => {
    return {
      date: format(date),
      totalSales: 0,
    };
  });

  return {
    chartData: chartData.reduce((data, order) => {
      const formattedDate = format(order.createdAt);
      const entry = dayArray.find((day) => day.date === formattedDate);
      if (entry == null) return data;
      entry.totalSales += order.pricePaidInCents / 100;
      return data;
    }, dayArray),
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count,
  };
};

const getProductData = async (
  createdAfter: Date | null,
  createdBefore: Date | null
) => {
  const createdAtQuery: Prisma.OrderWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [activeCount, inactiveCount, chartData] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
    db.product.findMany({
      select: {
        name: true,
        orders: {
          select: { pricePaidInCents: true },
          where: { createdAt: createdAtQuery },
        },
      },
    }),
  ]);

  return {
    chartData: chartData
      .map((product) => {
        return {
          name: product.name,
          revenue: product.orders.reduce((sum, order) => {
            return sum + order.pricePaidInCents / 100;
          }, 0),
        };
      })
      .filter((product) => product.revenue > 0),
    activeCount,
    inactiveCount,
  };
};

const getUserData = async (
  createdAfter: Date | null,
  createdBefore: Date | null
) => {
  const createdAtQuery: Prisma.UserWhereInput["createdAt"] = {};
  if (createdAfter) createdAtQuery.gte = createdAfter;
  if (createdBefore) createdAtQuery.lte = createdBefore;

  const [userCount, orderData, chartData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
    db.user.findMany({
      select: { createdAt: true },
      where: { createdAt: createdAtQuery },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  const { array, format } = getChartDateArray(
    createdAfter || startOfDay(chartData[0].createdAt),
    createdBefore || new Date()
  );

  const dayArray = array.map((date) => {
    return {
      date: format(date),
      totalUsers: 0,
    };
  });

  return {
    chartData: chartData.reduce((data, user) => {
      const formattedDate = format(user.createdAt);
      const entry = dayArray.find((day) => day.date === formattedDate);
      if (entry == null) return data;
      entry.totalUsers += 1;
      return data;
    }, dayArray),
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
};

const getChartDateArray = (startDate: Date, endDate: Date = new Date()) => {
  const days = differenceInDays(endDate, startDate);
  if (days < 30) {
    return {
      array: eachDayOfInterval(interval(startDate, endDate)),
      format: formatDate,
    };
  }

  const weeks = differenceInWeeks(endDate, startDate);
  if (weeks < 30) {
    return {
      array: eachWeekOfInterval(interval(startDate, endDate)),
      format: (date: Date) => {
        const start = max([startOfWeek(date), startDate]);
        const end = min([endOfWeek(date), endDate]);

        return `${formatDate(start)} - ${formatDate(end)}`;
      },
    };
  }

  const months = differenceInMonths(endDate, startDate);
  if (months < 30) {
    return {
      array: eachMonthOfInterval(interval(startDate, endDate)),
      format: new Intl.DateTimeFormat("en", { month: "long", year: "numeric" })
        .format,
    };
  }

  return {
    array: eachYearOfInterval(interval(startDate, endDate)),
    format: new Intl.DateTimeFormat("en", { year: "numeric" }).format,
  };
};

export { getSalesData, getProductData, getUserData };
