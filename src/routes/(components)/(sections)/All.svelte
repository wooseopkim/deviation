<script lang="ts">
	import type { Writable } from 'svelte/store';
	import MemberList from '$lib/components/MemberList.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import type { MemberPath } from '$lib/groups/MemberPath';

	export let focus: Writable<MemberPath | undefined>;
	export let data: readonly MemberPath[];
</script>

<MemberList members={data} {focus} on:select>
	<SectionTitle slot="title">All members</SectionTitle>
</MemberList>
