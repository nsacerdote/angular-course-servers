import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipe-book/recipe.model';

@Injectable()
export class ServerService {
    constructor(private http: Http) { }

    getRecipes() {
        return this.http.get('https://ng-recipe-book-39c77.firebaseio.com/recipes.json').pipe(map(
            (response: Response) => {
                const recipes: Recipe[] = response.json();
                recipes.map((recipe) => {
                    recipe.ingredients = recipe.ingredients || [];
                });
                return recipes;
            }
        ));
    }

    saveRecipes(recipes: Recipe[]) {
        return this.http.put('https://ng-recipe-book-39c77.firebaseio.com/recipes.json', recipes);
    }
}
