import { Suspense } from "react";
import ShopClient from "./shopClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <ShopClient />
    </Suspense>
  );
}
