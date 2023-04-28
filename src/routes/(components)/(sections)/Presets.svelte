<script lang="ts">
	import MemberList from '$lib/components/MemberList.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import type { Readable, Writable } from 'svelte/store';
	import type { Preset } from '../../(store)/presets';

	export let focus: Writable<MemberPath | undefined>;
	export let data: Readable<Preset[]>;
	export let folded: Writable<Set<number>>;

	function onToggle(id: number) {
		folded.update((value) => {
			if (value.has(id)) {
				value.delete(id);
				return value;
			}
			return value.add(id);
		});
	}
</script>

{#each $data as item}
	{@const { id, members, title } = item}
	{#key id}
		<MemberList {members} {focus} folded={$folded.has(id)} on:toggle={() => onToggle(id)} on:select>
			<SectionTitle slot="title">{title}</SectionTitle>
			<Toolbar slot="toolbar">
				<slot name="buttons" context={item} />
			</Toolbar>
		</MemberList>
	{/key}
{/each}
