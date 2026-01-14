import type { Metadata } from "next";
import {Figtree} from 'next/font/google';
import Image from "next/image";
import Link from "next/link";
import "./globals.css";


export const figtree = Figtree({
  weight: ['400', '600'],
  subsets: ['latin']
})


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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </head>
      <body className="figtree.className flex flex-col">

        <nav className="fixed flex flex-col items-center w-full h-max gap-2 pb-5 bg-black/80">
            <div className="p-2.5 w-full bg-[#692437] flex justify-center items-center">
              <p className="text-white text-[9.8pt] font-semibold tracking-wide">Free Shipping on Orders Over $75 | 100% Authentic Fragrances</p>
            </div>
            <Link href='/' >
            <Image src='/logo.png' height={60} width={60} alt="logo"/>
            </Link>
            <div className="w-max h-max gap-10 tracking-wider font-semibold flex flex-row items-center text-white">
              <Link className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]" href='/'>Home</Link>
              <Link className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]" href='/shop'>Shop</Link>
              <Link className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]" href='/deals'>Deals</Link>
              <Link className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]" href='/brands'>Brands</Link>
              <Link className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]" href='/about'>About</Link>
              <Link className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]" href='/contact'>Contact</Link>
            </div>
            <div className="absolute flex gap-5 w-max h-max bottom-2.5 right-8">
              <i className=" material-symbols-outlined cursor-pointer transition duration-200 text-white font-semibold hover:scale-110 hover:text-[#BD955E]">Search</i>
              <i className=" material-symbols-outlined cursor-pointer transition duration-200 text-white font-semibold hover:scale-110 hover:text-[#BD955E]">Shopping_Cart</i>
            </div>
        </nav>

        {children}

      </body>
    </html>
  );
}
