import {Ingredient} from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredientsUpdated = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Tomato', 2),
        new Ingredient('Carrot', 3)
    ];

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
}
