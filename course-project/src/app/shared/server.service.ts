import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipe-book/recipe.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ServerService {
    constructor(private httpClient: HttpClient) {
    }

    getRecipes() {

        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-39c77.firebaseio.com/recipes.json')
            .pipe(map(
                (recipes) => {
                    recipes.map((recipe) => {
                        recipe.ingredients = recipe.ingredients || [];
                    });
                    return recipes;
                }
            ));
    }

    saveRecipes(recipes: Recipe[]) {
        return this.httpClient.put('https://ng-recipe-book-39c77.firebaseio.com/recipes.json',
            recipes);
    }
}
