import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import NavDesktop from "./components/navDesktop";
import NavMobile from "./components/navMobile";
import FooterDesktop from "./components/footerDesktop";
import "./globals.css";

export const figtree = Figtree({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Aroma Circle",
  description: "Where Scents Become Signatures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className="figtree.className flex flex-col">
        <NavDesktop />
        <NavMobile />
        {children}
        <FooterDesktop />
      </body>
    </html>
  );
}
