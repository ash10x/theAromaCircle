import { Suspense } from "react";
import CategoryPageClient from "../CategoryPageClient";
import { getFragrances } from "../../../../../server/actions/getFragrances";

export default async function MenPage() {
  const data = await getFragrances("Men");

  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CategoryPageClient
        data={data}
        title="Men’s Fragrances"
        description="Bold, refined, and unforgettable fragrances crafted for him."
        heroImage="/category/mencat.png"
      />
    </Suspense>
  );
}
