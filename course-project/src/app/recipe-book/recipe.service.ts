import {EventEmitter} from '@angular/core';

import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [];

    constructor() {
        this.addRecipe(new Recipe('Chicken wings',
            'description',
            'https://assets.epicurious.com/photos/5761c748ff66dde1456dfec0/2:1/w_1260%2Ch_630/crispy-baked-chicken-wings.jpg',
            [
                new Ingredient('Chicken', 1),
                new Ingredient('BBQ Sauce', 5)
            ])
        );
        this.addRecipe(
            new Recipe('Chicken',
                'description 2',
                'https://assets.epicurious.com/photos/5761c748ff66dde1456dfec0/2:1/w_1260%2Ch_630/crispy-baked-chicken-wings.jpg',
                [
                    new Ingredient('Chicken', 2)
                ])
        );
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes.find((recipe) => (recipe.id === id));
    }

    addRecipe(recipe: Recipe) {
        recipe.id = Recipe.currentId++;
        this.recipes.push(recipe);
    }
}
