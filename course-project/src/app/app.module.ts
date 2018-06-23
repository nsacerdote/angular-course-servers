import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {RecipeListComponent} from './recipe-book/recipe-list/recipe-list.component';
import {RecipeListItemComponent} from './recipe-book/recipe-list/recipe-list-item.component';
import {RecipeDetailComponent} from './recipe-book/recipe-detail/recipe-detail.component';
import {HeaderComponent} from './header/header.component';
import {ShoppingEditComponent} from './shopping-list/shopping-edit/shopping-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AppRoutingModule} from './app-routing.module';
import { SelectRecipeComponent } from './recipe-book/select-recipe/select-recipe.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import {RecipeService} from './recipe-book/recipe.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ShoppingListComponent,
        RecipeBookComponent,
        RecipeListComponent,
        RecipeListItemComponent,
        RecipeDetailComponent,
        ShoppingEditComponent,
        DropdownDirective,
        SelectRecipeComponent,
        RecipeEditComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [ShoppingListService, RecipeService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
