import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    ingredients: Ingredient[];

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        this.subscription = this.shoppingListService.ingredientsUpdated.subscribe(
            (ingredients: Ingredient[]) => { this.ingredients = ingredients; }
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    loadItemForEdit (index: number) {
        this.shoppingListService.ingredientEditStarted.next(index);
    }


}
