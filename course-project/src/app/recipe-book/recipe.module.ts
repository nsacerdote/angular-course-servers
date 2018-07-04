import {NgModule} from '@angular/core';
import {RecipeBookComponent} from './recipe-book.component';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeListItemComponent} from './recipe-list/recipe-list-item.component';
import {SelectRecipeComponent} from './select-recipe/select-recipe.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipeRoutingModule} from './recipe-routing.module';
import {SharedModule} from '../shared/shared.module';
import {StoreModule} from '@ngrx/store';
import {recipeReducer} from './store/recipe.reducers';

@NgModule({
    declarations: [
        RecipeBookComponent,
        RecipeListComponent,
        RecipeListItemComponent,
        SelectRecipeComponent,
        RecipeEditComponent,
        RecipeDetailComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipeRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipeBook', recipeReducer)
    ]
})
export class RecipeModule {}
