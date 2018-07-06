import {Recipe} from './recipe.model';
import {ServerService} from '../shared/server.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [];

    constructor(private serverService: ServerService) {
    }

    fetchRecipes() {
        this.serverService.getRecipes().subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
            }
        );
    }

    saveRecipes() {
        this.serverService.saveRecipes(this.recipes).subscribe();
    }
}
