<script lang="ts">
	import type { Writable } from 'svelte/store';
	import bindDom from '$lib/store/dom';

	export let edit:
		| {
				target: Writable<string>;
				placeholder: string;
		  }
		| undefined = undefined;

	let dom: HTMLElement | undefined;
	$: {
		const target = edit?.target;
		if (target !== undefined) {
			bindDom(target, dom);
		}
	}
</script>

{#if edit !== undefined}
	<h3 contenteditable="true" placeholder={edit.placeholder} bind:this={dom}>
		<slot />
	</h3>
{:else}
	<h3><slot /></h3>
{/if}

<style>
	h3 {
		--title-max-width: 80%;
		max-width: var(--title-max-width);
		--padding-horizontal: 0.25em;
		--padding-vertical: 1em;
		padding-block-start: var(--padding-vertical);
		padding-block-end: var(--padding-vertical);
		padding-inline-start: var(--padding-horizontal);
		padding-inline-end: var(--padding-horizontal);
		margin: 0;
	}

	h3[contenteditable='true']:not(:focus):not(:hover):empty::before {
		max-width: var(--title-max-width);
		content: attr(placeholder);
		opacity: 0.3;
		font-style: italic;
		user-select: none;
	}
</style>
