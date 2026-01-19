import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="z-40 h-max w-full flex flex-col items-center bg-black">
      <main className="h-screen w-full bg-[url(/backgrounds/bg1.jpg)] bg-cover bg-center bg-ble max-sm:bg-size-[100%, 100%]">
        <div className="h-screen w-full bg-black/70 flex flex-col justify-end items-end max-sm:items-center">
          <div className="flex flex-col gap-2.5 h-max w-max overflow-hidden mr-16 mb-32 max-sm:mr-0 max-sm:w-85">
            <p className="text-[10pt] text-[#BD955E] font-semibold tracking-wide">
              The Aroma Circle
            </p>
            <p className="text-[40pt] text-[#ffffff] font-bold w-full tracking-wide max-sm:text-[28pt]">
              Luxury Fragrances. Authentic Brands.
            </p>
            <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wide w-full max-sm:text-[12pt]">
              Discover authentic designer fragrances crafted to captivate and
              inspire.
            </p>
            <Link href="/shop">
              <button className="text center outline-0 p-3 cursor-pointer text-white text-[14.5pt] tracking-wide font-semibold bg-[#692437] w-40 h-14 rounded-md transition duration-200 hover:scale-110 hover:bg-[#BD955E] max-sm:w-32 max-sm:h-12 max-sm:text-[12pt]">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </main>

      <div className="flex flex-col items-center gap-2.5 w-full h-max p-10 bg-black border-b-[.1px] border-b-[#0e0e0e] overflow-hidden">
        <p className="text-[30pt] text-white font-bold tracking-wider max-sm:text-[22pt] max-sm:text-center">
          Elite Signature Collections
        </p>
        <p className="text-[15pt] text-[#BD955E] font-semibold tracking-wider max-sm:text-[12pt]">
          Discover timeless creations from the world’s most prestigious perfume
          brands.
        </p>

        <div className="flex items-center justify-center w-max h-max overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer mt-5 max-sm:flex-wrap max-sm:w-full max-sm:gap-5 max-sm:p-5 max-sm:mt-5 max-sm:justify-center">
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden max-sm:w-30 max-sm:h-30">
            <Image
              className={"w-auto h-auto"}
              src={"/fragranceBrands/christiandior.png"}
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden max-sm:w-30 max-sm:h-30">
            <Image
              className={"w-auto h-auto"}
              src="/fragranceBrands/coach.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden max-sm:w-30 max-sm:h-30">
            <Image
              className={"w-auto h-auto"}
              src={"/fragranceBrands/polo.png"}
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden max-sm:w-30 max-sm:h-30">
            <Image
              className={"w-auto h-auto"}
              src="/fragranceBrands/versace.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
          <div className="flex items-center justify-center w-40 h-40 p-2.5 bg-black border-2 border-[#BD955E] rounded-md cursor-pointer transition duration-200 ease-in hover:scale-110 overflow-hidden max-sm:w-30 max-sm:h-30">
            <Image
              className={"w-auto h-auto"}
              src="/fragranceBrands/gucci.png"
              height={160}
              width={160}
              alt="Brand"
            />
          </div>
        </div>

        <Link href="/shop/brands" className="self-end h-max w-max">
          <button className="outline-0 w-32 h-12 p-2.5 text-white text-[14pt] tracking-wide font-semibold bg-[#692437] border-0 rounded-md transition duration-200 ease-in hover:scale-110 hover:bg-[#BD955E] cursor-pointer mt-5 max-sm:h-12 max-sm:text-[12pt]">
            View All
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2.5 w-full h-max p-10 bg-black border-b-[.1px] border-b-[#0e0e0e] overflow-hidden">
        <p className="text-[30pt] text-white font-bold tracking-wider max-sm:text-[22pt]">
          Luxury Best Sellers
        </p>
        <p className="text-[15pt] text-[#BD955E] font-semibold tracking-wider max-sm:text-[12pt]">
          Best-selling scents that leave a lasting impression—every time.
        </p>

        <div className="flex flex-row justify-center items-center gap-8 w-full p-5 h-max mt-5 max-sm:flex-wrap max-sm:w-full max-sm:gap-5 max-sm:p-5 max-sm:mt-5 max-sm:justify-center">
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer max-sm:w-30 max-sm:h-30">
            <Image
              className="w-auto h-auto transition ease-in duration-200 hover:scale-110"
              src={"/products/coachdreams.jpg"}
              height={150}
              width={150}
              alt="Product"
            />
          </div>

          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer max-sm:w-30 max-sm:h-30">
            <Image
              className="w-auto h-auto transition ease-in duration-200 hover:scale-110"
              src={"/products/versaceeros.jpg"}
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer max-sm:w-30 max-sm:h-30">
            <Image
              className="w-auto h-auto transition ease-in duration-200 hover:scale-110"
              src={"/products/marcjacobsdaisydream.jpg"}
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer max-sm:w-30 max-sm:h-30">
            <Image
              className="w-auto h-auto transition ease-in duration-200 hover:scale-110"
              src={"/products/burberrymrburberry.jpg"}
              height={150}
              width={150}
              alt="Product"
            />
          </div>
          <div className="flex items-center justify-center w-max h-max border-2 border-[#BD955E] rounded-md overflow-hidden transition ease-in duration-200 hover:scale-110 cursor-pointer max-sm:w-30 max-sm:h-30">
            <Image
              className="w-auto h-auto transition ease-in duration-200 hover:scale-110"
              src={"/products/versacelhomme.jpg"}
              height={150}
              width={150}
              alt="Product"
            />
          </div>
        </div>

        <Link href="/shop/bestsellers" className="self-end h-max w-max">
          <button className="outline-0 w-32 h-12 p-2.5 text-white text-[14pt] tracking-wide font-semibold bg-[#692437] border-0 rounded-md transition duration-200 ease-in hover:scale-110 hover:bg-[#BD955E] cursor-pointer mt-5 max-sm:h-12 max-sm:text-[12pt]">
            View All
          </button>
        </Link>
      </div>

      <div className="flex flex-col items-center gap-2.5 w-full h-max p-10 bg-black border-b-[.1px] border-b-[#0e0e0e] overflow-hidden">
        <p className="text-[30pt] text-white font-bold tracking-wider max-sm:text-[22pt]">
          Refined By Category
        </p>
        <p className="text-[15pt] text-[#BD955E] font-semibold tracking-wider max-sm:text-[12pt]">
          Find the perfect fragrance—designed for him, her, and every moment in
          between.
        </p>

        <div className="flex flex-row gap-8 h-max w-max overflow-hidden mt-5 p-5 max-sm:flex-wrap max-sm:w-full max-sm:gap-5 max-sm:p-5 max-sm:mt-5 max-sm:justify-center">
          <Link href={"/shop/men"}>
            <div className="flex items-center justify-center w-max h-max bg-black border-2 border-[#BD955E] rounded-md cursor-pointer overflow-hidden transition duration-200 ease-in hover:scale-110 max-sm:w-30 max-sm:h-40">
              <Image
                className="w-auto h-auto transition duration-200 ease-in hover:scale-110"
                src={"/category/mencat.png"}
                height={150}
                width={150}
                alt="category"
              />
            </div>
          </Link>
          <Link href={"/shop/women"}>
            <div className="flex items-center justify-center w-max h-max bg-black border-2 border-[#BD955E] rounded-md cursor-pointer overflow-hidden transition duration-200 ease-in hover:scale-110 max-sm:w-30 max-sm:h-40">
              <Image
                className="w-auto h-auto transition duration-200 ease-in hover:scale-110"
                src={"/category/womencat.png"}
                height={200}
                width={200}
                alt={"category"}
              />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-0 w-full h-max p-10 bg-black border-b-[.1px] border-b-[#0e0e0e] overflow-hidden">
        <Image
          className="w-auto h-auto transition duration-200 ease-in hover:scale-110 max-sm:w-65 max-sm:h-65"
          src={"/misc/productprop.png"}
          height={400}
          width={400}
          alt="prop"
        />
        <div className="flex flex-col items-start h-max w-max ml-10 gap-5 max-sm:ml-0">
          <p className="text-[35pt] text-white font-bold tracking-wider max-sm:text-[22pt]">
            Premium. Authentic. Trusted.
          </p>
          <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wider max-sm:text-[12pt]">
            100% authentic perfumes backed by secure service and support.
          </p>
          <Link href="/about">
            <button className="outline-0 w-32 h-12 p-2.5 text-white text-[14pt] tracking-wide font-semibold bg-[#692437] border-0 rounded-md transition duration-200 ease-in hover:scale-110 hover:bg-[#BD955E] cursor-pointer max-sm:h-12 max-sm:text-[12pt]">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-0 w-full h-max p-10 bg-black overflow-hidden max-sm:p-5">
        <div className="w-max h-max flex flex-col items-start justify-center">
          <p className="text-[25pt] text-white font-bold tracking-wider mb-5 max-sm:text-[16pt] max-sm:w-100 max-sm:text-center">
            Join The Aroma Circle Community
          </p>
          <p className="text-[14pt] text-[#BD955E] font-semibold tracking-wider mb-5 max-sm:text-[12pt] max-sm:w-100 max-sm:text-center">
            Sign up for exclusive offers, new arrivals, and fragrance tips.
          </p>
          <div className="flex flex-row gap-2.5 w-max h-max max-sm:w-full max-sm:items-center max-sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-64 h-12 p-2.5 rounded-md outline-0 border-2 border-[#BD955E] bg-black text-white placeholder:text-[#BD955E] focus:border-[#ffffff] transition duration-200 ease-in max-sm:w-48 max-sm:h-10 max-sm:text-[12pt]"
            />
            <button className="outline-0 w-32 h-12 p-2.5 text-white text-[14pt] tracking-wide font-semibold bg-[#692437] border-0 rounded-md transition duration-200 ease-in hover:scale-110 hover:bg-[#BD955E] cursor-pointer max-sm:w-24 max-sm:h-10 max-sm:text-[12pt]">
              Subscribe
            </button>
          </div>
          <div className="flex flex-row gap-5 h-max w-max max-sm:justify-center max-sm:w-full">
            <Link href={"#"}>
              <Image
                className="w-7.5 h-auto mt-5 max-sm:mx-0"
                src={"/socials/instagram.svg"}
                height={30}
                width={30}
                alt="instagram"
              />
            </Link>
            <Link href={"#"}>
              <Image
                className="w-7.5 h-auto mt-5 max-sm:mx-0"
                src={"/socials/facebook.svg"}
                height={30}
                width={30}
                alt="facebook"
              />
            </Link>
            <Link href={"#"}>
              <Image
                className="w-7.5 h-auto mt-5"
                src={"/socials/tiktok.svg"}
                height={30}
                width={30}
                alt="tiktok"
              />
            </Link>
            <Link href={"#"}>
              <Image
                className="w-7.5 h-auto mt-5"
                src={"/socials/x.svg"}
                height={30}
                width={30}
                alt="x"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
