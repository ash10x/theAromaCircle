import { Suspense } from "react";
import ShopClient from "./shopClient";
import { getFragrances } from "../../../../server/actions/getFragrances";

export default async function ShopPage() {
  const data = await getFragrances();
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ShopClient data={data} />
    </Suspense>
  );
}
