import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { Page } from '@sveltejs/kit';
import { onDestroy } from 'svelte';
import { derived, get, type Writable } from 'svelte/store';

export function registerQuery<V extends Writable<string>, K extends string = string>(
	variable: V,
	key: K
): void;
export function registerQuery<
	T extends object,
	V extends Writable<string>,
	K extends string = string
>(
	variable: V,
	key: K,
	transformer: {
		encode: (value: T) => string;
		decode: (value: string) => T;
	}
): void;
export default function registerQuery<T, V extends Writable<T>, K extends string>(
	variable: V,
	key: K,
	transformer: {
		encode: (value: T) => string;
		decode: (value: string) => T;
	} = {
		encode: (x) => String(x),
		decode: (x) => x as unknown as T,
	}
) {
	if (typeof window === 'undefined') {
		return;
	}

	const { url } = get(page);
	const query = url.searchParams;
	const param = query.get(key) ?? '';
	const value = transformer?.decode?.(param);
	if (value !== undefined) {
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
