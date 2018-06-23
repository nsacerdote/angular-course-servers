import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsUpdated = new Subject<Ingredient[]>();
    ingredientEditStarted = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 2),
        new Ingredient('Carrot', 3)
    ];

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsUpdated.next(this.getIngredients());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsUpdated.next(this.getIngredients());
    }

    updateIngredient(index: number, updatedIngredient: Ingredient) {
        this.ingredients[index] = updatedIngredient;
        this.ingredientsUpdated.next(this.getIngredients());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsUpdated.next(this.getIngredients());
    }
}
