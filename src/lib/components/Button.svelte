<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let enabled = true;

	const dispatch = createEventDispatcher<{
		click: undefined;
	}>();

	function onClick() {
		dispatch('click');
	}
</script>

<button disabled={!enabled} on:click={onClick}><slot /></button>

<style>
	button {
		all: unset;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.9);
		color: white;
		--padding-vertical: 0.8rem;
		padding-inline-start: 0.2rem;
		padding-inline-end: 1rem;
		padding-block-start: var(--padding-vertical);
		padding-block-end: var(--padding-vertical);
	}

	button:disabled {
		opacity: 0.3;
		cursor: default;
	}
</style>
