<script lang="ts" context="module">
	export type SetTask = (task: Promise<void>, loader: string) => void;
</script>

<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from 'svelte';
	import Button from './Button.svelte';

	type $$Props = ComponentProps<Button>;

	let task: Promise<void>;
	let loader: string;

	const dispatch = createEventDispatcher<{
		click: SetTask;
	}>();

	function onClick() {
		dispatch('click', setTask);
	}

	function setTask(value: typeof task, text: string) {
		task = value;
		loader = text;
	}
</script>

{#await task}
	<Button enabled={false}>
		{#if loader !== undefined}
			{loader}
		{:else}
			<slot />
		{/if}
	</Button>
{:then}
	<Button {...$$restProps} on:click={onClick}>
		<slot />
	</Button>
{/await}
