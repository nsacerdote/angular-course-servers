import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

    recipe: Recipe;

    constructor(private activatedRoute: ActivatedRoute,
                private shoppingListService: ShoppingListService,
                private recipeService: RecipeService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.recipe = this.recipeService.getRecipe(+params['id']);
            }
        );
    }

    onAddToShoppingList() {
        this.shoppingListService.addIngredients(this.recipe.ingredients);
    }
}
