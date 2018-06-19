import {EventEmitter} from '@angular/core';

import {Recipe} from './recipe.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Chicken wings', 'description',
            'https://assets.epicurious.com/photos/5761c748ff66dde1456dfec0/2:1/w_1260%2Ch_630/crispy-baked-chicken-wings.jpg'),
        new Recipe('Chicken', 'description 2',
            'https://assets.epicurious.com/photos/5761c748ff66dde1456dfec0/2:1/w_1260%2Ch_630/crispy-baked-chicken-wings.jpg')
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}
