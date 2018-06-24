import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth-guard.service';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {SelectRecipeComponent} from './select-recipe/select-recipe.component';
import {RecipeBookComponent} from './recipe-book.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const recipeRoutes: Routes = [
    { path: '', component: RecipeBookComponent, children: [
            { path : '', component: SelectRecipeComponent, pathMatch: 'full' },
            { path : 'new', component: RecipeEditComponent , canActivate : [AuthGuard]},
            { path : ':id', component: RecipeDetailComponent },
            { path : ':id/edit', component: RecipeEditComponent, canActivate : [AuthGuard]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})
export class RecipeRoutingModule { }
