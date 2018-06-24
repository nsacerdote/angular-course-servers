import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromShoppingList from './store/shopping-list.reducers';
import * as ShoppingListActions from './store/shopping-list.actions';
import {AppState} from '../store/app.reducers';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

    shoppingListState: Observable<fromShoppingList.State>;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.shoppingListState = this.store.select('shoppingList');
    }

    loadItemForEdit (index: number) {
        this.store.dispatch(new ShoppingListActions.StartEditIngredient(index));
    }
}
