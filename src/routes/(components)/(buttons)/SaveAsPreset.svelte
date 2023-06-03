<script lang="ts">
	import { customPresets } from '../../(store)/presets';
	import Button from '$lib/components/Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';

	export let data: SubUnit;

	function onClick() {
		customPresets.update((value) => {
			const preset = {
				...data,
				id: new Date().valueOf(),
				title: data.title || 'Your unnamed preset',
				builtIn: false as const,
			};
			return [...value, preset];
		});
	}
</script>

<Button enabled={data.members.length > 0} on:click={onClick}>Save as preset</Button>
