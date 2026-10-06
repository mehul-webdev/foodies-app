import MealItem from "./meal-item";
import { MealItemsProps } from "./types";
import styles from "./meals-grid.module.css";

const MealsGrid = ({ meals }: MealItemsProps) => {
  return (
    <ul className={styles.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
