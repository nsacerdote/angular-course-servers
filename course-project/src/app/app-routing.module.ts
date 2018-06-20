import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipe-book/recipe-detail/recipe-detail.component';
import {SelectRecipeComponent} from './recipe-book/select-recipe/select-recipe.component';
import {RecipeEditComponent} from './recipe-book/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipeBookComponent, children: [
            { path : '', component: SelectRecipeComponent, pathMatch: 'full' },
            { path : 'new', component: RecipeEditComponent },
            { path : ':id', component: RecipeDetailComponent },
            { path : ':id/edit', component: RecipeEditComponent },
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: '**', redirectTo: '/recipes' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
