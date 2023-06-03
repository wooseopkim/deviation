<script lang="ts">
	import type { Writable } from 'svelte/store';
	import type { Preset } from '../../(store)/presets';
	import Button from '$lib/components/Button.svelte';

	export let data: Preset;
	export let from: Writable<(typeof data)[]>;

	function onClick() {
		from.update((value) => {
			const index = value.findIndex(({ id }) => data.id === id);
			if (index === -1) {
				console.log('not found', data, value);
				return value;
			}
			return [...value.slice(0, index), ...value.slice(index + 1)];
		});
	}
</script>

<Button on:click={onClick}>Delete</Button>
