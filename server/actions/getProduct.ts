"use server";

import { desc } from "drizzle-orm/sql/expressions/select";
import { db } from "../index";
import { fragrances } from "../schema";

export async function getProducts() {
  try {
    const allFragrances = await db
      .select()
      .from(fragrances)
      .orderBy(fragrances.id)
      .limit(1000); // Adjust the limit as needed
    return allFragrances;
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    throw new Error("Failed to fetch fragrances");
  }
}
