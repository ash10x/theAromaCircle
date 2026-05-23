import { Suspense } from "react";
import CategoryPageClient from "../CategoryPageClient";
import { getFragrances } from "../../../../../server/actions/getFragrances";

export default async function WomenPage() {
  const data = await getFragrances("Women");

  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <CategoryPageClient
        data={data}
        title="Women’s Fragrances"
        description="Soft, bold, and beautifully composed scents to elevate every signature moment."
        heroImage="/category/womencat.png"
      />
    </Suspense>
  );
}
