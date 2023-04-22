<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let className: string | undefined;

	const dispatchFocus = createEventDispatcher<{
		focus: boolean;
		hover: boolean;
	}>();
	function onFocus() {
		dispatchFocus('focus', true);
	}
	function onBlur() {
		dispatchFocus('focus', false);
	}
	function onMouseOver() {
		dispatchFocus('hover', true);
	}
	function onMouseLeave() {
		dispatchFocus('hover', false);
	}

	const dispatchSelect = createEventDispatcher();
	function onSelect() {
		dispatchSelect('select');
	}
</script>

<button
	class={className}
	on:focus={onFocus}
	on:blur={onBlur}
	on:mouseover={onMouseOver}
	on:mouseleave={onMouseLeave}
	on:click={onSelect}
>
	<slot />
</button>

<style>
	button {
		all: unset;
		display: inline-block;
		transition-property: opacity;
		transition-duration: 0.5s;
	}

	button.blurred {
		opacity: 0.1;
	}
</style>
