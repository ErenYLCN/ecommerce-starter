import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/core/ui/_globals.scss";
import "@/core/ui/_override.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Boilerplate",
  description: "A boilerplate for e-commerce websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
