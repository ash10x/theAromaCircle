"use server";

import { desc } from "drizzle-orm/sql/expressions/select";
import { db } from "../index";
import { fragrances } from "../schema";

export async function bestSellers() {
  try {
    const allFragrances = await db
      .select()
      .from(fragrances)
      .orderBy(desc(fragrances.id))
      .limit(4);
    return allFragrances;
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    throw new Error("Failed to fetch fragrances");
  }
}
