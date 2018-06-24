import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipe-book/recipe-detail/recipe-detail.component';
import {SelectRecipeComponent} from './recipe-book/select-recipe/select-recipe.component';
import {RecipeEditComponent} from './recipe-book/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuard} from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full'},
    { path: 'recipes', component: RecipeBookComponent, children: [
            { path : '', component: SelectRecipeComponent, pathMatch: 'full' },
            { path : 'new', component: RecipeEditComponent , canActivate : [AuthGuard]},
            { path : ':id', component: RecipeDetailComponent },
            { path : ':id/edit', component: RecipeEditComponent, canActivate : [AuthGuard]},
        ]
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '/recipes' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
