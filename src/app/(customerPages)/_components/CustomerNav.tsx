import NavLink from "@/components/ui/NavLink";
import React from "react";

const AdminNav = () => {
  return (
    <nav className="bg-primary text-primary-foreground flex justify-center px-4">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/products">Products</NavLink>
      <NavLink href="/orders">My Orders</NavLink>
    </nav>
  );
};

export default AdminNav;
