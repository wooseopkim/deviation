<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import type { Writable } from 'svelte/store';

	export let of: Writable<SubUnit>;

	function onClick() {
		of.update((value) => ({
			...value,
			members: [],
		}));
	}
</script>

<Button enabled={$of.members.length > 0} on:click={onClick}>Clear members</Button>
