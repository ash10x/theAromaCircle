"use server";

import { desc } from "drizzle-orm/sql/expressions/select";
import { db } from "../index";
import { fragrances } from "../schema";

export async function featured() {
  try {
    const allFragrances = await db
      .select()
      .from(fragrances)
      .orderBy(desc(fragrances.id))
      .limit(6);
    return allFragrances;
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    throw new Error("Failed to fetch fragrances");
  }
}

export default featured;
