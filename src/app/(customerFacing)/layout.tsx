import { Nav, NavLink } from "@/component/nav/Nav";

export const dynamic = "force-dynamic";

export default function CustomerFacingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <NavLink href={"/"}>{"Home"}</NavLink>
        <NavLink href={"/products"}>{"Products"}</NavLink>
        <NavLink href={"/orders"}>{"My Orders"}</NavLink>
      </Nav>
      <div className={"container my-6"}>{children}</div>
    </>
  );
}
