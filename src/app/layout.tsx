import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/core/ui/_globals.scss";
import { cn } from "@/core/util/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          inter.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
