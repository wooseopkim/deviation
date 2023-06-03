<script lang="ts">
	import type { Writable } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import { type MemberPath, equalsMemberPath } from '$lib/groups/MemberPath';
	import type { SubUnit } from '$lib/groups/SubUnit';

	export let data: MemberPath[];
	export let to: Writable<SubUnit>;

	function onClick() {
		to.update((value) => {
			const noDuplicate = (x: MemberPath) =>
				!value.members.some(equalsMemberPath.bind(undefined, x));
			return {
				...value,
				members: [...value.members, ...data.filter(noDuplicate)],
			};
		});
	}
</script>

<Button on:click={onClick}>Add all</Button>
