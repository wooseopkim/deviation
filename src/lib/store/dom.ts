import { onDestroy } from 'svelte';
import type { Writable } from 'svelte/store';

export default function bindDom(variable: Writable<string>, dom: HTMLElement | undefined) {
	if (dom === undefined) {
		return;
	}

	const onInput = () => {
		const { textContent } = dom;
		if (textContent == null) {
			return;
		}
		variable.set(textContent);
	};
	dom.addEventListener('input', onInput);
	onDestroy(() => dom.removeEventListener('input', onInput));

	const unsubscribe = variable.subscribe((value) => {
		dom.textContent = value;
	});
	onDestroy(unsubscribe);
}
