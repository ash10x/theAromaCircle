import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full bg-[url(/backgrounds/bg1.jpg)] bg-cover bg-center bg-ble">
      <div className="h-screen w-full bg-black/50 flex flex-col justify-end items-end">
        <div className="flex flex-col gap-2.5 h-max w-max mr-16 mb-32">
            <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wide">The Aroma Circle</p>
            <p className="text-[40pt] text-[#ffffff] font-bold w-lg tracking-wide">Luxury Fragrances. Authentic Brands.</p>
            <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wide">Discover authentic designer fragrances crafted to captivate and inspire.</p>
            <Link href="/shop">
              <button className="text center outline-0 p-3 cursor-pointer text-white text-[14.5pt] tracking-wide font-semibold bg-[#692437] w-40 h-14 rounded-md transition duration-200 hover:scale-110 hover:bg-[#BD955E]">Shop Now</button>
            </Link>
        </div>
      </div>
    </main>
  );
}
