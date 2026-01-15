import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="h-screen w-full bg-[url(/backgrounds/bg1.jpg)] bg-cover bg-center bg-ble">
        <div className="h-screen w-full bg-black/50 flex flex-col justify-end items-end">
          <div className="flex flex-col gap-2.5 h-max w-max mr-16 mb-32">
            <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wide">
              The Aroma Circle
            </p>
            <p className="text-[40pt] text-[#ffffff] font-bold w-lg tracking-wide">
              Luxury Fragrances. Authentic Brands.
            </p>
            <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wide">
              Discover authentic designer fragrances crafted to captivate and
              inspire.
            </p>
            <Link href="/shop">
              <button className="text center outline-0 p-3 cursor-pointer text-white text-[14.5pt] tracking-wide font-semibold bg-[#692437] w-40 h-14 rounded-md transition duration-200 hover:scale-110 hover:bg-[#BD955E]">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </main>

      <div className="flex flex-col items-center gap-2.5 w-full h-max p-10 bg-black">
        <p className="text-[30pt] text-white font-bold tracking-wider">
          Elite Signature Collections
        </p>
        <p className="text-[15pt] text-[#BD955E] font-semibold tracking-wider">
          Discover timeless creations from the world’s most prestigious perfume
          brands.
        </p>

        <div className="flex flex-row justify-center gap-8 w-full h-max mt-5">
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden">
            <Image
              src="/brandLogos/christiandior.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden">
            <Image
              src="/brandLogos/coach.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden">
            <Image
              src="/brandLogos/polo.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden">
            <Image
              src="/brandLogos/ysl.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden">
            <Image
              src="/brandLogos/gucci.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
        </div>

        <button className="self-end outline-0 w-28 h-10 p-1.5 mr-5 text-white text-[11pt] tracking-wider font-semibold bg-[#692437] border-0 rounded-md transition duration-200 ease-in hover:scale-110 hover:bg-[#BD955E] cursor-pointer">
          View All
        </button>
      </div>

      <div className="flex flex-col items-center gap-2.5 w-full h-max p-10 bg-black">
        <p className="text-[30pt] text-white font-bold tracking-wider">
          Luxury Best Sellers
        </p>
        <p className="text-[15pt] text-[#BD955E] font-semibold tracking-wider">
          Best-selling scents that leave a lasting impression—every time.
        </p>

        <div className="flex flex-row justify-center items-center gap-8 w-full p-5 h-max">
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer">
            <Image
              className="transition ease-in duration-200 hover:scale-110"
              src="/products/burberryhero.jpg"
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer">
            <Image
              className="transition ease-in duration-200 hover:scale-110"
              src="/products/versaceeros.jpg"
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer">
            <Image
              className="transition ease-in duration-200 hover:scale-110"
              src="/products/marcjacobsdaisydream.jpg"
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer">
            <Image
              className="transition ease-in duration-200 hover:scale-110"
              src="/products/burberrymrburberry.jpg"
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer">
            <Image
              className="transition ease-in duration-200 hover:scale-110"
              src="/products/versacelhomme.jpg"
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer">
            <Image
              className="transition ease-in duration-200 hover:scale-110"
              src="/products/moschinotoy2bg.jpg"
              height={150}
              width={150}
              alt="Product"
            />
          </div>
        </div>

        <Link href="/shop/bestsellers" className="self-end h-max w-max">
          <button className="outline-0 w-28 h-10 p-1.5 mr-5 text-white text-[11pt] tracking-wider font-semibold bg-[#692437] border-0 rounded-md transition duration-200 ease-in hover:scale-110 hover:bg-[#BD955E] cursor-pointer">
            View All
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2.5 w-full h-max p-10 bg-black">
        <p className="text-[30pt] text-white font-bold tracking-wider">
          Refined By Category
        </p>
        <p className="text-[15pt] text-[#BD955E] font-semibold tracking-wider">
          Find the perfect fragrance—designed for him, her, and every moment in
          between.
        </p>

        <div className="flex flex-row gap-8 h-max w-max overflow-hidden ">
          <div className="h-max w-max border-2 border-[#BD955E] rounded-md transition ease-in duration-300 hover:scale-110 cursor-pointer overflow-hidden">
            <Image
              src="/category/men.png"
              height={200}
              width={200}
              alt="category"
            />
          </div>
        </div>

        <div className="flex flex-row justify-center  gap-8 w-max p-5 h-[50vh] overflow-hidden"></div>
      </div>
    </div>
  );
}
