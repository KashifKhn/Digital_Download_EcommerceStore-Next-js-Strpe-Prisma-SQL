import NavLink from "@/components/ui/NavLink";
import React from "react";

const AdminNav = () => {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
      <NavLink href="/admin">Dashboard</NavLink>
      <NavLink href="/admin/products">Products</NavLink>
      <NavLink href="/admin/users">Customers</NavLink>
      <NavLink href="/admin/orders">Sales</NavLink>
      <NavLink href="/admin/coupon-codes">Coupons</NavLink>
    </nav>
  );
};

export default AdminNav;
