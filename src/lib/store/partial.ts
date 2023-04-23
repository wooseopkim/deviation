import { derived, type Writable } from 'svelte/store';

export default function createPartial<T, K extends keyof T>(
	original: Writable<T>,
	key: K
): Writable<T[K]> {
	const partial = derived(original, (value) => value[key]);

	const set: Writable<T[K]>['set'] = (partialValue) => {
		original.update((x) => ({
			...x,
			[key]: partialValue,
		}));
	};

	const update: Writable<T[K]>['update'] = (partialUpdate) => {
		original.update((x) => ({
			...x,
			[key]: partialUpdate(x[key]),
		}));
	};

	return {
		...partial,
		set,
		update,
	};
}
