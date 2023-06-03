import { onDestroy } from 'svelte';
import type { Writable } from 'svelte/store';
import { browser } from '$app/environment';

export default function registerLocalStorage<T, K extends string = string>(
	variable: Writable<T>,
	key: K
) {
	if (!browser) {
		return;
	}

	const value = localStorage.getItem(key);
	if (value !== null) {
		variable.set(JSON.parse(value));
	}

	const unsubscribe = variable.subscribe((value) => {
		localStorage.setItem(key, JSON.stringify(value));
	});
	onDestroy(unsubscribe);
}
