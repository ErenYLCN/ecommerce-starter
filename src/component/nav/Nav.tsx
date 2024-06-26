"use client";

import { ComponentProps } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/core/util/utils";

export function Nav({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <nav
      className={"bg-primary text-primary-foreground flex justify-center px-4"}
    >
      {children}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathName = usePathname();

  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathName === props.href && "bg-background text-foreground",
      )}
    />
  );
}
