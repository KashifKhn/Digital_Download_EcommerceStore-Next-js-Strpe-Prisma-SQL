"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentProps } from "react";

const NavLink = (props: Omit<ComponentProps<typeof Link>, "className">) => {
  const pathName = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 transition-all ease-in-out duration-400 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathName === props.href && "bg-background text-foreground"
      )}></Link>
  );
};

export default NavLink;
