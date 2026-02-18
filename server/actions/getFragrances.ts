"use server";

import { db } from "../index";
import { fragrances } from "../schema";

export async function getFragrances() {
  try {
    const allFragrances = await db.select().from(fragrances);
    return allFragrances;
  } catch (error) {
    console.error("Error fetching fragrances:", error);
    throw new Error("Failed to fetch fragrances");
  }
}
