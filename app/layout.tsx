import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocso",
  description: "Página web de administración de Ocsos",
};

import Providers from "../providers";
import Sidebar from "./dashboard/_components/_sidebar/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>

          {children}
        </Providers>
      </body>
    </html>
  );
}
