import React from "react";
import CustomerNav from "./_components/CustomerNav";

export const dynamic = "force-dynamic";

const CustomerLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <CustomerNav />
      <div className="my-6 container">{children}</div>
    </>
  );
};

export default CustomerLayout;
