export interface MealItemsProps {
  meals: MealItemProps[];
}

export interface MealItemProps {
  id: number | string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
}

export interface MealItemSaveProps {
  title: string;
  image: File;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
  slug: string;
}
