import ProductPage from "./productPageLayout";
import { getProductById } from "../../../../../../server/actions/getProductById";
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
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) notFound();

  return <ProductPage product={product} />;
}
