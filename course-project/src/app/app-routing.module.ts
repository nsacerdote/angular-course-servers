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
import {HomeComponent} from './home/home.component';
import {RecipeRoutingModule} from './recipe-book/recipe-routing.module';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipe-book/recipe.module#RecipeModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
