import type { Page } from '@sveltejs/kit';
import { onDestroy } from 'svelte';
import { type Writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

function registerQuery<K extends string = string>(variable: Writable<string>, key: K): void;
function registerQuery<T extends object, K extends string>(
	variable: Writable<T>,
	key: K,
	transformer: {
		encode: (value: T) => string;
		decode: (value: string) => T;
	}
): void;
function registerQuery<T, K extends string = string>(
	variable: Writable<T>,
	key: K,
	transformer: {
		encode: (value: T) => string;
		decode: (value: string) => T;
	} = {
		encode: (x) => String(x),
		decode: (x) => x as unknown as T,
	}
) {
	if (!browser) {
		return;
	}

	const { url } = get(page);
	const query = url.searchParams;
	const param = query.get(key) ?? '';
	const value = transformer?.decode?.(param);
	if (query.has(key) && value !== undefined) {
		variable.set(value);
	}

	const unsubscribe = derived([variable, page], (x) => x as [T, Page]).subscribe(
		([value, { url }]) => {
			const code = transformer?.encode?.(value) ?? '';
			const query = url.searchParams;
			if (code.length === 0) {
				query.delete(key);
			} else {
				query.set(key, code);
			}
			goto(url, {
				replaceState: true,
				noScroll: true,
				keepFocus: true,
			});
		}
	);
	onDestroy(unsubscribe);
}

export default registerQuery;
