import Nav from "@/components/Nav";
import React from "react";

export const dynamic = "force-dynamic";

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
