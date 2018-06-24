import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducers';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private recipeService: RecipeService,
                private store: Store<fromShoppingList.AppState>) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.recipe = this.recipeService.getRecipe(+params['id']);
            }
        );
    }

    onAddToShoppingList() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    }

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.recipe);
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}
