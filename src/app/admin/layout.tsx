import Nav from "@/components/Nav";
import React from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Nav />
      <div className="my-6 container">{children}</div>
    </>
  );
};

export default AdminLayout;
