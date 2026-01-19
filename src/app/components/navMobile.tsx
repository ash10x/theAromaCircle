"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function navMobile() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className={navOpen ? "overflow-hidden" : "overflow-auto"}>
      <div
        className={
          !navOpen
            ? "fixed top-0 right-0 flex flex-row items-center gap-2.5 justify-end p-5 h-max w-full bg-black overflow-hidden z-50 md:hidden"
            : "hidden"
        }
      >
        <Image
          className={"w-6 h-auto cursor-pointer md:hidden"}
          src={"/icons/search.svg"}
          height={25}
          width={25}
          alt="logo"
        />
        <Image
          className={"w-6 h-auto cursor-pointer md:hidden"}
          src={"/icons/menu.svg"}
          height={25}
          width={25}
          alt="logo"
          onClick={() => setNavOpen(true)}
        />
      </div>

      <div
        className={
          navOpen
            ? "fixed flex flex-col items-center justify-center h-screen w-full bg-black z-50 overflow-hidden transition-all ease-in-out duration-300 md:hidden"
            : "fixed flex flex-col items-center justify-center h-0 w-full bg-black z-50 overflow-hidden transition-all ease-in-out duration-300 md:hidden "
        }
      >
        <Image
          className={
            navOpen
              ? "absolute top-0 right-13 w-6 h-auto mt-7 cursor-pointer transition ease-in-out duration-200 opacity-150"
              : "absolute top-0 right-13 w-6 h-auto mt-7 cursor-pointer transition ease-in-out duration-200 opacity-0"
          }
          src={"/icons/cart.svg"}
          height={25}
          width={25}
          alt="logo"
        />
        <Image
          className={
            "absolute top-0 mt-6 right-3 w-[34px]h-auto cursor-pointer"
          }
          src={"/icons/arrowup.svg"}
          height={34}
          width={34}
          alt="logo"
          onClick={() => setNavOpen(false)}
        />

        <Link
          href="/"
          className={
            navOpen
              ? "mt-5 mb-10 transition ease-in-out duration-200 opacity-100"
              : "mt-5 mb-10 transition ease-in-out duration-200 opacity-0"
          }
        >
          <Image
            className={"w-auto h-auto"}
            src={"/logowhite.png"}
            height={60}
            width={60}
            alt="logo"
          />
        </Link>

        <div
          className={
            navOpen
              ? "w-max h-max gap-10 tracking-wider font-semibold flex flex-col items-center text-white mb-20 transition ease-in-out duration-200 opacity-100"
              : "w-max h-max gap-10 tracking-wider font-semibold flex flex-col items-center text-white mb-20 transition ease-in-out duration-200 opacity-0"
          }
        >
          <Link
            className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]"
            href="/"
          >
            Home
          </Link>
          <Link
            className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]"
            href="/shop"
          >
            Shop
          </Link>
          <Link
            className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]"
            href="/deals"
          >
            Deals
          </Link>
          <Link
            className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]"
            href="/brands"
          >
            Brands
          </Link>
          <Link
            className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]"
            href="/about"
          >
            About
          </Link>
          <Link
            className="cursor-pointer transition ease-in duration-200 hover:scale-110 hover:text-[#BD955E]"
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
