import React, { ReactNode } from "react";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return <div className="text-4xl">{children}</div>;
};

export default PageHeader;
