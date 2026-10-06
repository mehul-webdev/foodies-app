import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

import type {
  MealItemProps,
  MealItemSaveProps,
} from "@/components/meals/types";

const db = sql("meals.db");

export async function getMeals() {
  return db.prepare<[], MealItemProps>("SELECT * FROM meals").all();
}

export function getMeal(slug: string) {
  return db
    .prepare<[string], MealItemProps>("SELECT * FROM meals WHERE slug = ?")
    .get(slug);
}

export function deleteMealsByCreatorEmail(creatorEmail: string) {
  return db
    .prepare<[string]>("DELETE FROM meals WHERE creator = ?")
    .run(creatorEmail);
}

export async function saveMeal(meal: MealItemSaveProps) {
  const savingMeal: Omit<MealItemSaveProps, "image"> & { image: string } = {
    ...meal,
    image: "",
    slug: slugify(meal.title, { lower: true }),
  };
  savingMeal.instructions = xss(meal.instructions);
  const extension = meal.image.name.split(".").pop();
  const fileName = `${savingMeal.slug}.${extension}`;
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  savingMeal.image = `/images/${fileName}`;

  db.prepare(
    `
      INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES
        (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `,
  ).run(savingMeal);
}
