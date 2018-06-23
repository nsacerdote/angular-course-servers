import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('f') shoppingListForm: NgForm;
    subscription: Subscription;
    editMode;
    editIngredientIndex: number;

    constructor(private shoppingListService: ShoppingListService) {
    }

    ngOnInit() {
        this.resetFormStatus();
        this.subscription = this.shoppingListService.ingredientEditStarted.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editIngredientIndex = index;
                const editIngredient = this.shoppingListService.getIngredient(this.editIngredientIndex);
                this.shoppingListForm.setValue(editIngredient);
            }
        );
    }

    resetFormStatus() {
        this.editMode = false;
        this.editIngredientIndex = null;
        this.shoppingListForm.reset();
    }

    onSubmit() {
        const formValue = this.shoppingListForm.value;
        const formIngredient = new Ingredient(formValue.name, +formValue.amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(this.editIngredientIndex, formIngredient);
        } else {
            this.shoppingListService.addIngredient(formIngredient);
        }
        this.resetFormStatus();
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editIngredientIndex);
        this.resetFormStatus();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
