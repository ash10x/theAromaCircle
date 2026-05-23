"use server";

import { db } from "../index";
import { fragrances } from "../schema";
import { eq } from "drizzle-orm";

export async function getFragrances(category?: string) {
  try {
    const baseQuery = db.select().from(fragrances);
    const allFragrances =
      category && category !== "All"
        ? await baseQuery.where(eq(fragrances.category, category))
        : await baseQuery;

    return allFragrances;
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    throw new Error("Failed to fetch fragrances");
  }
}
