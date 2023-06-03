<script lang="ts">
	import type { Writable } from 'svelte/store';
	import MemberList from '$lib/components/MemberList.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import Toolbar from '$lib/components/Toolbar.svelte';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import createPartial from '$lib/store/partial';

	export let focus: Writable<MemberPath | undefined>;
	export let data: Writable<SubUnit>;
</script>

<MemberList members={$data.members} {focus} on:select>
	<SectionTitle
		edit={{
			target: createPartial(data, 'title'),
			placeholder: 'Your unnamed palette — click here to edit',
		}}
		slot="title"
	>
		{$data.title}
	</SectionTitle>
	<Toolbar slot="toolbar">
		<slot name="buttons" context={$data} />
	</Toolbar>
</MemberList>
