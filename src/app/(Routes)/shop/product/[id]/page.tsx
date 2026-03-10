import ProductPage from "./productPageLayout";
import { getProducts } from "../../../../../../server/actions/getProduct";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  description?: string;
  images: string[];
  rating: number;
  quantity: number;
  size: number;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // unwrap the promise

  const products = await getProducts();

  if (!products || products.length === 0) notFound();

  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return <ProductPage product={product} />;
}
