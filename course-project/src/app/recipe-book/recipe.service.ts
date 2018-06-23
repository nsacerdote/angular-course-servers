import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import {ServerService} from '../shared/server.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    constructor(private serverService: ServerService) {
        this.addRecipe(
            new Recipe('Chicken wings',
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

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes.find((recipe) => (recipe.id === id));
    }

    addRecipe(recipe: Recipe) {
        recipe.id = recipe.id || Recipe.currentId++;
        this.recipes.push(recipe);
        this.recipesChanged.next(this.getRecipes());
    }

    updateRecipe(updatedRecipe: Recipe) {
        const index = this.recipes.findIndex((recipe) => (recipe.id === updatedRecipe.id));
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.getRecipes());
    }

    deleteRecipe(recipeToDelete: Recipe) {
        const index = this.recipes.findIndex((recipe) => (recipe.id === recipeToDelete.id));
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.getRecipes());
    }

    fetchRecipes() {
        this.serverService.getRecipes().subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
                this.recipesChanged.next(this.getRecipes());
            }
        );
    }

    saveRecipes() {
        this.serverService.saveRecipes(this.recipes).subscribe();
    }
}
