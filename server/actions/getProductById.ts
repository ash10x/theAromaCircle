"use server";

import { eq } from "drizzle-orm";
import { db } from "../index";
import { fragrances } from "../schema";

export async function getProductById(id: number) {
  const [product] = await db
    .select()
    .from(fragrances)
    .where(eq(fragrances.id, id))
    .limit(1);

  return product;
}
