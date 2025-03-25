import createLang from '../../assets/create/lang/en_us.json';
import minecraftLang from '../../assets/minecraft/lang/en_us.json';

const lang: Record<string, string> = {
	...minecraftLang,
	...createLang
}

export function getItemName(item_id: string) {
	const itemIdParts = item_id.split(':');
	const namespace = itemIdParts[0];
	const id = itemIdParts[1];

	return lang[`item.${namespace}.${id}`]
		?? lang[`block.${namespace}.${id}`]
		?? item_id;
}