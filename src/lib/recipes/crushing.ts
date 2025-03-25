import { clamp } from "../utils";
import { z } from "zod";
import { RecipeThroughput } from "./types";
import { MillingRecipe, millingRecipes } from "./milling";
import { Ingredient } from "./schemas";

export type CrushingRecipe = MillingRecipe | {
	type: "create:crushing",
	ingredients: Ingredient[],
	processingTime: number,
	results: [
		{ item: string, count?: number, chance?: number }
	]
}

export const crushingRecipes = Promise.all([
	millingRecipes,
	Promise.all(
		Object.entries(
			import.meta.glob('../../../data/create/recipes/crushing/*.json')
		).map(([, value]) => value())
	) as Promise<CrushingRecipe[]>,
]).then((items) => items.flat());


export const crushingRecipeInputSchema = z.object({
	rpm: z.number().min(1),
	stackSize: z.number().min(1).max(64),
	inputDelay: z.number()
})

export function calculateThroughputOfCrushing(recipe: CrushingRecipe, rawInput: unknown): RecipeThroughput {
	const processingTimeItemsPerSecond = calculateProcessingTimeOfCrushing(recipe, rawInput);

	return {
		maxInput: processingTimeItemsPerSecond,
		results: recipe.results.map(result => {
			const count = result.count ?? 1;
			const chance = result.chance ?? 1;
			const averageOutput = processingTimeItemsPerSecond * count * chance;
			return { item: result.item, averageOutput };
		})
	}
}

/**
 * Helper function to calculate the processing time of a crushing recipe
 * 
 * @param recipe 
 * @param rawInput 
 * @returns 
 */
function calculateProcessingTimeOfCrushing(recipe: CrushingRecipe, rawInput: unknown): number {
	const input = crushingRecipeInputSchema.parse(rawInput); // if parse fails, explode

	const topTerm = recipe.processingTime - 20;
	const bottomTerm = clamp(
		((input.rpm / 50) * 4)
		/
		Math.log2(Math.max(input.stackSize, 2)),
	0.25, 20);
	const ticksPerStack = (topTerm / bottomTerm) + 1 + input.inputDelay;

	console.log({
		topTerm,
		bottomTerm,
		ticksPerStack,
		input
	})

	const stacksPerTick = 1 / ticksPerStack
	const itemsPerTick = stacksPerTick * input.stackSize;
	const itemsPerSecond = itemsPerTick * 20;

	return itemsPerSecond;
}
