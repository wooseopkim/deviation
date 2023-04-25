<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let enabled = true;
	let task: Promise<void>;
	let loader: string;

	const dispatch = createEventDispatcher<{
		click: {
			setTask: typeof setTask;
		};
	}>();

	function onClick() {
		dispatch('click', { setTask });
	}

	function setTask(value: typeof task, text: string) {
		task = value;
		loader = text;
	}
</script>

{#await task}
	<Button enabled={false}>
		{loader ?? ''}
	</Button>
{:then}
	<Button {enabled} on:click={onClick}>
		<slot />
	</Button>
{/await}
