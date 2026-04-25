import { get, push, ref, remove, update } from "firebase/database";
import { Recipe } from "../models/Recipe";
import { database } from "../services/connectionFirebase";

const getUserRecipesPath = (userId: string) => `users/${userId}/recipes`;

export const recipeService = {
  async create(userId: string, recipe: Recipe) {
    const recipeRef = ref(database, getUserRecipesPath(userId));
    await push(recipeRef, recipe);
  },

  async getAll(userId: string): Promise<Recipe[]> {
    const snapshot = await get(ref(database, getUserRecipesPath(userId)));
    const data = snapshot.val();
    if (!data) {
      return [];
    }

    const recipes: Recipe[] = [];

    for (let id in data) {
      recipes.push({ id, ...data[id] });
    }

    return recipes;
  },

  async update(userId: string, id: string, recipe: Recipe) {
    const recipeRef = ref(database, `${getUserRecipesPath(userId)}/${id}`);
    await update(recipeRef, recipe);
  },

  async delete(userId: string, id: string) {
    const recipeRef = ref(database, `${getUserRecipesPath(userId)}/${id}`);
    await remove(recipeRef);
  },
};
