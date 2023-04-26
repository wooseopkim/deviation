<script lang="ts">
	import MemberList from '$lib/components/MemberList.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import type { Writable } from 'svelte/store';

	export let focus: Writable<MemberPath | undefined>;
	export let data: readonly MemberPath[];
</script>

<MemberList summarized={false} members={data} {focus} on:select>
	<SectionTitle slot="title">All members</SectionTitle>
</MemberList>
