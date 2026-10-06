import sql from "better-sqlite3";
import type { MealItemProps } from "@/components/meals/types";

const db = sql("meals.db");

export async function getMeals() {
  return db.prepare<[], MealItemProps>("SELECT * FROM meals").all();
}
