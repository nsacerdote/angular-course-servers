import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {Recipe} from '../recipe-book/recipe.model';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class ServerService {
    constructor(private authService: AuthService,
                private http: Http) {
    }

    getRecipes() {
        const token = this.authService.getToken();

        return this.http.get('https://ng-recipe-book-39c77.firebaseio.com/recipes.json?auth=' + token)
            .pipe(map(
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
        const token = this.authService.getToken();

        return this.http.put('https://ng-recipe-book-39c77.firebaseio.com/recipes.json?auth=' + token,
            recipes);
    }
}
