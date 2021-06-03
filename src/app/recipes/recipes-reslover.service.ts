import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeSerivce } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecipesResloverService implements Resolve<Recipe[]>{

    constructor(private dataService: DataStorageService, private recipeService: RecipeSerivce) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0) {
        return this.dataService.fetchRecipes();
        } else {
            return recipes;
        }
    }

}