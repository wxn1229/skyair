import type { Metadata } from "next";
import { Lato, Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${lato.className}`}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="light">
            <div className="w-full h-full min-h-screen  bg-blue-100 dark:bg-zinc-800">
              {children}
            </div>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
