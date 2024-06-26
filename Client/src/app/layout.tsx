import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import AuthPovider from "@/providers/AuthPovider";
import Loader from "@/components/loaders/Loader";
import HeaderTemplate from "@/components/templets/Header/HeaderTemplate";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<Loader />}>
            <AuthPovider>
              <HeaderTemplate>{children}</HeaderTemplate>
            </AuthPovider>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
