<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import type { Writable } from 'svelte/store';

	export let data: SubUnit;
	export let from: Writable<SubUnit[]>;

	function onClick() {
		from.update((value) => {
			const index = value.indexOf(data);
			return [...value.slice(0, index), ...value.slice(index + 1)];
		});
	}
</script>

<Button on:click={onClick}>Delete</Button>
