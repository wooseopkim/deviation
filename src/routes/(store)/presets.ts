import { derived, readable, writable } from 'svelte/store';
import type { SubUnit } from '$lib/groups/SubUnit';
import presets from '$lib/groups/presets';

export type Preset<T extends boolean = boolean> = SubUnit & {
	id: number;
	builtIn: T;
};

export const customPresets = writable([] as Preset<false>[]);

const builtInPresets = presets.map((data) => ({
	...data,
	id: Math.random(),
	builtIn: true,
}));

export const allPresets = derived([readable(builtInPresets), customPresets], (x) => x.flat());
