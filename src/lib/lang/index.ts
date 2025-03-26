import createUsEn from '@/../assets/create/lang/en_us.json';
import minecraftUsEn from '@/../assets/minecraft/lang/en_us.json';
import { tagsUsEN } from './tags';


const lang: Record<string, string> = {
	...minecraftUsEn,
	...createUsEn
}

export function getItemName(item_id: string) {
	const itemIdParts = item_id.split(':');
	const namespace = itemIdParts[0];
	const id = itemIdParts[1];

	return lang[`item.${namespace}.${id}`]
		?? lang[`block.${namespace}.${id}`]
		?? item_id;
}

export function getTagName(tag_id: string) {
	return tagsUsEN[tag_id] ?? tag_id;
}