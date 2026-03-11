import { Suspense } from "react";
import LandingLayout from "./landingLayout";
import { bestSellers } from "../../server/actions/bestSellers";

/* ================= DATA WRAPPER ================= */

async function LandingData() {
  const data = await bestSellers();
  return <LandingLayout data={data} />;
}

/* ================= PAGE ================= */

export default function LandingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-white">
          The Aroma Circle
        </div>
      }
    >
      <LandingData />
    </Suspense>
  );
}
