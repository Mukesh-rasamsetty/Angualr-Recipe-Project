import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { RecipeSerivce } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeSerivce, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://angular-sample-project-6e0d5-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            // do nothing...
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://angular-sample-project-6e0d5-default-rtdb.firebaseio.com/recipes.json'
        ).pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    };
                });
            }), tap(recipes => {
                this.recipeService.setRecipes(recipes);
            })
        );
    }
}