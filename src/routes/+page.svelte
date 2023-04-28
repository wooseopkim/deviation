<script lang="ts">
	import GroupSelector from '$lib/components/GroupSelector.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import groups, { toPath, type Group } from '$lib/groups';
	import { equalsMemberPath, type MemberPath } from '$lib/groups/MemberPath';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import decodeShareCode from '$lib/share-code/decode';
	import encodeShareCode from '$lib/share-code/encode';
	import registerLocalStorage from '$lib/store/local-storage';
	import registerQuery from '$lib/store/query';
	import { derived, readable, writable, type Readable } from 'svelte/store';
	import AddAll from './(components)/(buttons)/AddAll.svelte';
	import ClearMembers from './(components)/(buttons)/ClearMembers.svelte';
	import ClearTitle from './(components)/(buttons)/ClearTitle.svelte';
	import CopyShareCode from './(components)/(buttons)/CopyShareCode.svelte';
	import Delete from './(components)/(buttons)/Delete.svelte';
	import LoadShareCode from './(components)/(buttons)/LoadShareCode.svelte';
	import Replace from './(components)/(buttons)/Replace.svelte';
	import SaveAsPreset from './(components)/(buttons)/SaveAsPreset.svelte';
	import About from './(components)/(sections)/About.svelte';
	import All from './(components)/(sections)/All.svelte';
	import Image from './(components)/(sections)/Image.svelte';
	import Palette from './(components)/(sections)/Palette.svelte';
	import PresetList from './(components)/(sections)/Presets.svelte';
	import focus from './(store)/focus';
	import folded from './(store)/folded';
	import palette from './(store)/palette';
	import { allPresets, customPresets, type Preset } from './(store)/presets';

	const group = writable<Group | undefined>();

	registerLocalStorage(palette, 'palette');
	registerQuery(palette, 'palette', {
		encode: encodeShareCode,
		decode: decodeShareCode,
	});
	registerLocalStorage(customPresets, 'customPresets');
	registerLocalStorage(group, 'group');
	initializeGroup($palette);

	let all: SubUnit['members'] = [];
	let presets: Readable<Preset[]> = readable([]);
	$: ((group: Group | undefined) => {
		if (group === undefined) {
			return;
		}
		let { id, members } = groups[group];
		all = members.map(({ name }) => toPath(group, name));
		presets = derived(allPresets, (x) =>
			x.filter((data) => data.members.some(([groupId]) => groupId === id))
		);
	})($group);

	function onSelectMember(id: MemberPath) {
		palette.update((value) => ({
			...value,
			members: toggle(value.members, id),
		}));
	}

	function toggle(list: MemberPath[], id: MemberPath) {
		const index = list.findIndex((x) => equalsMemberPath(x, id));
		if (index !== -1) {
			return [...list.slice(0, index), ...list.slice(index + 1)];
		}
		return [...list, id];
	}

	function initializeGroup({ members }: SubUnit) {
		const firstMember = members[0];
		if (firstMember === undefined) {
			return;
		}
		const hasTheMember = equalsMemberPath.bind(undefined, firstMember);
		const result = Object.entries(groups).find(([group, { members }]) => {
			return members.map((x) => toPath(group as Group, x.name)).some(hasTheMember);
		});
		if (result === undefined) {
			return;
		}
		group.set(result[0] as Group);
	}
</script>

<h1><super>https://</super><span><strong>deviation</strong><span>.by.wooseop.kim</span></span></h1>
<main>
	<section>
		<GroupSelector data={groups} target={group} />
		<All data={all} {focus} on:select={(e) => onSelectMember(e.detail)} />
		<PresetList data={presets} {focus} {folded} on:select={(e) => onSelectMember(e.detail)}>
			<svelte:fragment slot="buttons" let:context={preset}>
				<AddAll data={preset.members} to={palette} />
				<Replace data={preset} into={palette} />
				{#if !preset.builtIn}
					<Delete data={preset} from={customPresets} />
				{/if}
				<CopyShareCode of={preset} />
			</svelte:fragment>
		</PresetList>
	</section>
	<section>
		<Palette data={palette} {focus} on:select={(e) => onSelectMember(e.detail)}>
			<svelte:fragment slot="buttons" let:context={data}>
				<ClearTitle of={palette} />
				<ClearMembers of={palette} />
				<SaveAsPreset {data} />
				<CopyShareCode of={data} />
				<LoadShareCode into={palette} />
			</svelte:fragment>
		</Palette>
		{#if $palette.members.length > 0}
			<Image data={$palette} />
		{/if}
		<SectionTitle>About this app</SectionTitle>
		<About />
	</section>
</main>

<style>
	h1 {
		flex-shrink: 0;
		user-select: none;
		margin: 0;
		display: flex;
		flex-direction: column;
		--non-title-margin-start: 0.5vmin;
		--title-margin-start: -0.03em;
		width: 100%;
		overflow-x: scroll;
		overflow-y: hidden;
	}

	h1 super {
		margin-inline-start: var(--non-title-margin-start);
		line-height: 1.4em;
	}

	h1 strong {
		text-transform: uppercase;
		font-size: 16vmin;
		line-height: 0.6em;
		margin-inline-start: var(--title-margin-start);
	}

	h1 span span {
		margin-inline-start: -0.2em;
	}

	@media (max-width: 1680px) {
		h1 {
			overflow-x: hidden;
		}

		h1 span span {
			display: flex;
			flex-direction: column;
			margin-inline-start: var(--non-title-margin-start);
			line-height: 0.3em;
		}
	}

	main {
		flex-shrink: 1;
		flex-grow: 1;
		overflow: auto;
		display: flex;
		flex-direction: row;
		margin-inline-start: 0.4rem;
		--card-width: 10vi;
	}

	main > :global(*) {
		width: 50%;
		overflow-y: scroll;
	}

	section {
		display: flex;
		flex-direction: column;
	}

	@media (max-width: 1680px) {
		h1 {
			padding-bottom: 1em;
		}

		main {
			flex-direction: column;
			--padding-top: 1rem;
			--card-width: 20vi;
			overflow: initial;
		}

		main > :global(*) {
			width: 100%;
			overflow-y: inherit;
		}
	}

	@media (max-width: 768px) {
		main {
			--card-width: 40vi;
		}
	}
</style>
