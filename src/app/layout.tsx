import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import NavDesktop from "./components/navDesktop";
import NavMobile from "./components/navMobile";
import FooterDesktop from "./components/footerDesktop";
import { CartProvider } from "./context/cartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Aroma Circle",
  description: "Where Scents Become Signatures",
  icons: {
    icon: "/logo.png",
  },
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
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} flex flex-col bg-[#080808]`}
      >
        <CartProvider>
          <NavDesktop />
          <NavMobile />
          {children}
          <FooterDesktop />
        </CartProvider>
      </body>
    </html>
  );
}
