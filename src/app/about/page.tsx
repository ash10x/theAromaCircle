"use client";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-60 h-max w-full flex flex-col items-center bg-black px-4 py-16 tracking-wide">
      <p className="text-[28pt] text-[#BD955E] font-bold mb-5">
        More Than Fragrance. It’s Identity.
      </p>

      <p className="mt-4 text-[12pt] text-white w-[60%]">
        At The Aroma Circle, scent is a statement. It’s how you enter a room.
        It’s how you’re remembered. We curate premium fragrances for individuals
        who understand that style doesn’t stop at what you wear—it’s what you
        leave behind.
      </p>

      <div className="mt-8 w-[60%] h-max space-y-6 text-white text-[12pt]">
        <section className={"flex flex-col gap-4 pb-4"}>
          <h2 className="text-2xl font-semibold mb-1 text-[#BD955E]">
            Our Story
          </h2>
          <p className={"text-[#692437] font-semibold text-[13pt]"}>
            Where It Began
          </p>
          <p>
            The Aroma Circle was born from a simple truth: fragrance is
            personal, powerful, and deeply emotional. A single scent can unlock
            memories, spark confidence, and define moments. We saw fragrance not
            as a luxury, but as a form of self-expression—one everyone deserves
            access to.
          </p>
          <p>
            What started as a passion for exceptional aromas became a mission:
            to make authentic, high-quality fragrances accessible to those who
            move with intention and style.
          </p>
        </section>
        <section className={"flex flex-col gap-4 pb-4"}>
          <h2 className="text-2xl font-semibold mb-1 text-[#BD955E]">
            Our Philosophy
          </h2>
          <p className={"text-[#692437] font-semibold text-[13pt]"}>
            Scent Is Power
          </p>
          <p>
            We believe every person carries a unique energy. Fragrance is how
            you amplify it.
          </p>
          <p>
            Each bottle we offer is chosen with precision—whether bold and
            magnetic, soft and intimate, or clean and timeless. Our collection
            is designed to match moods, moments, and identities, helping you
            find a scent that feels like you.
          </p>
          <ul className={"list-none list-inside space-y-2"}>
            <li>This isn’t about trends.</li>
            <li>It’s about presence.</li>
            <li>It’s about confidence.</li>
            <li>It’s about becoming unforgettable.</li>
          </ul>
        </section>
        <section className={"flex flex-col gap-4 pb-4"}>
          <h2 className="text-2xl font-semibold mb-1 text-[#BD955E]">
            What We Offer
          </h2>
          <p className={"text-[#692437] font-semibold text-[13pt]"}>
            Curated. Authentic. Elevated
          </p>
          <p>At The Aroma Circle, we specialize in:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Premium designer fragrances</li>
            <li>Hard-to-find and hidden-gem scents</li>
            <li>100% authentic products</li>
            <li>A refined, modern shopping experience</li>
          </ul>
          <p>
            Every fragrance in our circle earns its place. No clutter. No
            guesswork. Just scents that make an impact.
          </p>
        </section>
        <section className={"flex flex-col gap-4 pb-4"}>
          <h2 className="text-2xl font-semibold mb-1 text-[#BD955E]">
            The Experience
          </h2>
          <p className={"text-[#692437] font-semibold text-[13pt]"}>
            More Than Shopping
          </p>
          <p>
            We’re not just selling cologne and perfume—we’re creating a journey.
          </p>
          <p>
            From the moment you browse to the instant your fragrance arrives,
            every detail is crafted to feel intentional, smooth, and elevated.
            You’re not just choosing a scent—you’re discovering a new version of
            yourself.
          </p>
        </section>
        <section className={"flex flex-col gap-4 pb-4"}>
          <h2 className="text-2xl font-semibold mb-1 text-[#BD955E]">
            Enter The Circle
          </h2>
          <Link href="/shop">
            <button className="bg-[#692437] text-white font-semibold px-6 py-2 w-max rounded-md hover:bg-[#a6854e] transition ease-in duration-200 cursor-pointer">
              Shop Now
            </button>
          </Link>
          <p>Your scent is your signature.</p>
          <p>Your presence is your brand.</p>
        </section>
      </div>
    </div>
  );
}
