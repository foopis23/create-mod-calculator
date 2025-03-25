import { Ingredient } from "./schemas";

export type MillingRecipe = {
	type: "create:milling",
	ingredients: Ingredient[],
	processingTime: number,
	results: [
		{ item: string, count?: number, chance?: number }
	]
}

export const millingRecipes = Promise.all(
	Object.entries(
		import.meta.glob('../../../data/create/recipes/milling/*.json')
	).map(([, value]) => value())
) as Promise<MillingRecipe[]>;