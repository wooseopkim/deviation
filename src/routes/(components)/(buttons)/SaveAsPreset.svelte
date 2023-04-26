<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import { customPresets } from '../../(store)/presets';

	export let data: SubUnit;

	function onClick() {
		customPresets.update((value) => {
			const preset = data;
			return [...value, { ...preset, title: preset.title || 'Your unnamed preset' }];
		});
	}
</script>

<Button enabled={data.members.length > 0} on:click={onClick}>Save as preset</Button>
