<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import type { Writable } from 'svelte/store';

	export let data: SubUnit;
	export let into: Writable<SubUnit>;

	function onClick() {
		into.set(data);
	}
</script>

<Button on:click={onClick}>Replace</Button>
