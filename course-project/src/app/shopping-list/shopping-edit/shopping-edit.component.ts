import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';
import {AppState} from '../../store/app.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f') shoppingListForm: NgForm;
    subscription: Subscription;
    editMode;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.resetFormStatus();
        this.subscription = this.store.select('shoppingList')
            .subscribe(
                (data: fromShoppingList.State) => {
                    if (data.editingIngredient) {
                        this.editMode = true;
                        this.shoppingListForm.setValue(data.editingIngredient);
                    } else {
                        this.editMode = false;
                    }
                }
            );
    }

    resetFormStatus() {
        this.editMode = false;
        this.shoppingListForm.reset();
    }

    onSubmit() {
        const formValue = this.shoppingListForm.value;
        const formIngredient = new Ingredient(formValue.name, +formValue.amount);
        if (this.editMode) {
            this.store.dispatch(
                new ShoppingListActions.UpdateIngredient({
                    updatedIngredient: formIngredient
                })
            );
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(formIngredient));
        }
        this.resetFormStatus();
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.resetFormStatus();
    }

    ngOnDestroy(): void {
        this.store.dispatch(new ShoppingListActions.StopEditIngredient());
        this.subscription.unsubscribe();
    }
}
