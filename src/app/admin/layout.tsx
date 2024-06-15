import React from "react";
import AdminNav from "./_components/AdminNav";

export const dynamic = "force-dynamic";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <AdminNav />
      <div className="my-6 container">{children}</div>
    </>
  );
};

export default AdminLayout;
