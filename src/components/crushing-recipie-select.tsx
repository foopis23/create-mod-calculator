"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { useQuery } from "@tanstack/react-query"
import { CrushingRecipe, crushingRecipes } from "@/lib/recipes/crushing"
import { isTagIngredient } from "@/lib/recipes/schemas"
import { getItemName } from "@/lib/lang"
import { cn } from "@/lib/utils"

function recipeToLabel(recipe?: CrushingRecipe) {
	if (!recipe) return "";

	const ingredientName = (isTagIngredient(recipe.ingredients[0]) ? recipe.ingredients[0].tag : getItemName(recipe.ingredients[0].item))
	return `${ingredientName} => ${getItemName(recipe.results[0].item)}`
}

function sortRecipes(a: CrushingRecipe, b: CrushingRecipe) {
	const aLabel = recipeToLabel(a)
	const bLabel = recipeToLabel(b)
	return aLabel.localeCompare(bLabel)
}

export function CrushingRecipeSelect(props: { value: CrushingRecipe | undefined, onChange: (value: CrushingRecipe | undefined) => void }) {
	const { value, onChange: setValue } = props

	const { data: recipes } = useQuery({
		queryKey: ['crushingRecipes'],
		queryFn: async () => (await crushingRecipes).sort(sortRecipes),
	})

	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[400px] justify-between"
				>
					{value
						? recipeToLabel((recipes ?? []).find((recipe) => JSON.stringify(recipe) === JSON.stringify(value)))
						: "Select recipe..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[400px] p-0">
				<Command>
					<CommandInput placeholder="Search recipe..." />
					<CommandList>
						<CommandEmpty>No recipe found.</CommandEmpty>
						<CommandGroup>
							{(recipes ?? []).map((recipe) => (
								<CommandItem
									key={JSON.stringify(recipe)}
									value={JSON.stringify(recipe)}
									onSelect={(currentValue) => {
										setValue(currentValue === JSON.stringify(value) ? undefined : JSON.parse(currentValue))
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											JSON.stringify(value) === JSON.stringify(recipe) ? "opacity-100" : "opacity-0"
										)}
									/>
									{recipeToLabel(recipe)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
