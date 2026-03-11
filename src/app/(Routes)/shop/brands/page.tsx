import BrandsPage from "./brandsPage";
import featured from "../../../../../server/actions/featured";

/* ================= DATA WRAPPER ================= */

async function BrandsData() {
  const data = await featured();

  return <BrandsPage data={data} />;
}

/* ================= PAGE ================= */

export default function Brands() {
  return <BrandsData />;
}
