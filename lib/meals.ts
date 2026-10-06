import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";

import type {
  MealItemProps,
  MealItemSaveProps,
} from "@/components/meals/types";

const db = sql("meals.db");
const s3 = new S3({
  region: "ap-south-1",
});

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
  const bufferedImage = await meal.image.arrayBuffer();

  await s3.putObject({
    Bucket: "mehul-nextjs-foodie-app",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  savingMeal.image = fileName;

  db.prepare(
    `
      INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
      VALUES
        (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `,
  ).run(savingMeal);
}
