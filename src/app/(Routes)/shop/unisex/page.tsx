import { Suspense } from "react";
import CategoryPageClient from "../CategoryPageClient";
import { getFragrances } from "../../../../../server/actions/getFragrances";

export default async function UnisexPage() {
  const data = await getFragrances("Unisex");

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
      <CategoryPageClient
        data={data}
        title="Unisex Fragrances"
        description="Gender-fluid scents designed for every identity — bold, balanced, and effortlessly refined."
        heroImage="/category/unisexcat.png"
      />
    </Suspense>
  );
}
