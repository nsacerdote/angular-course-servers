import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import {FeatureState, State} from '../store/recipe.reducers';
import {Subscription} from 'rxjs';
import {Recipe} from '../recipe.model';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;
    subscription: Subscription;
    id: number;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private store: Store<FeatureState>) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.subscription = this.store.select('recipeBook').subscribe(
                    (state: State) => {
                        this.recipe = state.recipes.find((recipe) => (recipe.id === this.id));
                    }
                );
            }
        );
    }
    onAddToShoppingList() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(
            this.recipe.ingredients
        ));
    }

    onDeleteRecipe() {
        this.store.dispatch(new DeleteRecipe(
            this.id
        ));
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }
}
