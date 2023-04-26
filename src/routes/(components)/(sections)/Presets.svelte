<script lang="ts">
	import MemberList from '$lib/components/MemberList.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import type { Readable, Writable } from 'svelte/store';

	export let focus: Writable<MemberPath | undefined>;
	export let data: Readable<
		{
			builtIn: boolean;
			data: SubUnit;
		}[]
	>;
</script>

{#each $data as item}
	{@const { members, title } = item.data}
	<MemberList {members} {focus} on:select>
		<SectionTitle slot="title">{title}</SectionTitle>
		<Toolbar slot="toolbar">
			<slot name="buttons" context={item} />
		</Toolbar>
	</MemberList>
{/each}
