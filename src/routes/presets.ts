import type { SubUnit } from '$lib/groups/SubUnit';
import builtInPresets from '$lib/groups/presets';
import { derived, readable, writable, type Readable } from 'svelte/store';

export const customPresets = writable([] as SubUnit[]);

export const allPresets = derived(
	[wrapPreset(readable(builtInPresets), true), wrapPreset(customPresets, false)],
	(x) => x.flat()
);

function wrapPreset(original: Readable<SubUnit[]>, builtIn: boolean) {
	const mapper = (presets: SubUnit[]) => presets.map((data) => ({ builtIn, data }));
	return derived(original, mapper);
}
