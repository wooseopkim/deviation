<script lang="ts">
	import MemberList from './MemberList.svelte';
	import palette from './palette';
	import encodeShareCode from '$lib/share-code/encode';
	import decodeShareCode from '$lib/share-code/decode';
	import registerQuery from '$lib/store/query';
	import registerLocalStorage from '$lib/store/local-storage';
	import SectionTitle from './SectionTitle.svelte';
	import ImageGrid from './ImageGrid.svelte';
	import groups, { toPath } from '$lib/groups';
	import { equalsMemberPath, type MemberPath } from '$lib/groups/MemberPath';
	import createPartial from '$lib/store/partial';
	import Toolbar from './Toolbar.svelte';
	import ToolbarButton from './ToolbarButton.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import { allPresets, customPresets } from './presets';
	import { derived } from 'svelte/store';

	registerLocalStorage(palette, 'palette');
	registerQuery(palette, 'palette', {
		encode: encodeShareCode,
		decode: decodeShareCode,
	});
	registerLocalStorage(customPresets, 'customPresets');

	const group = 'tripleS';
	const { id, members } = groups[group];
	const all: SubUnit<typeof group>['members'] = members.map(({ name }) => toPath(group, name));
	const presets = derived(allPresets, (x) =>
		x.filter(({ data }) => data.members.some(([groupId]) => groupId === id))
	);

	function onAddAll(members: MemberPath[]) {
		palette.update((value) => {
			const noDuplicate = (x: MemberPath) =>
				!value.members.some(equalsMemberPath.bind(undefined, x));
			return {
				...value,
				members: [...value.members, ...members.filter(noDuplicate)],
			};
		});
	}

	function onReplace(preset: SubUnit) {
		palette.set(preset);
	}

	function onDelete(preset: SubUnit) {
		customPresets.update((value) => {
			const index = value.indexOf(preset);
			return [...value.slice(0, index), ...value.slice(index + 1)];
		});
	}

	function onClearTitle() {
		palette.update((value) => ({
			...value,
			title: '',
		}));
	}

	function onClearMembers() {
		palette.update((value) => ({
			...value,
			members: [],
		}));
	}

	function onSavePreset() {
		customPresets.update((value) => {
			const preset = $palette;
			return [...value, { ...preset, title: preset.title || 'Your unnamed preset' }];
		});
	}
</script>

<h1><super>https://</super><span><strong>deviation</strong><span>.by.wooseop.kim</span></span></h1>
<main>
	<section>
		<MemberList summarized={false} members={all}>
			<SectionTitle slot="title">All members</SectionTitle>
		</MemberList>
		{#each $presets as { builtIn, data: preset }}
			<MemberList members={preset.members}>
				<SectionTitle slot="title">{preset.title}</SectionTitle>
				<Toolbar slot="toolbar">
					<ToolbarButton on:click={() => onAddAll(preset.members)}>Add all</ToolbarButton>
					<ToolbarButton on:click={() => onReplace(preset)}>Replace</ToolbarButton>
					{#if !builtIn}
						<ToolbarButton on:click={() => onDelete(preset)}>Delete</ToolbarButton>
					{/if}
					<ToolbarButton enabled={$palette.members.length > 0}>Copy share code</ToolbarButton>
				</Toolbar>
			</MemberList>
		{/each}
	</section>
	<section>
		<MemberList summarized={false} members={$palette.members}>
			<SectionTitle
				edit={{
					target: createPartial(palette, 'title'),
					placeholder: 'Your unnamed palette — click here to edit',
				}}
				slot="title"
			>
				{$palette.title}
			</SectionTitle>
			<Toolbar slot="toolbar">
				<ToolbarButton enabled={$palette.title.length > 0} on:click={onClearTitle}>
					Clear title
				</ToolbarButton>
				<ToolbarButton enabled={$palette.members.length > 0} on:click={onClearMembers}>
					Clear members
				</ToolbarButton>
				<ToolbarButton enabled={$palette.members.length > 0} on:click={onSavePreset}>
					Save as preset
				</ToolbarButton>
				<ToolbarButton enabled={$palette.members.length > 0}>Copy share code</ToolbarButton>
			</Toolbar>
		</MemberList>
		{#if $palette.members.length > 0}
			<SectionTitle>Image</SectionTitle>
			<div class="grid-wrapper">
				<ImageGrid title={$palette.title} members={$palette.members} />
			</div>
		{/if}
	</section>
</main>

<style>
	:root {
		overflow: hidden;
	}

	h1 {
		user-select: none;
		margin: 0;
		position: sticky;
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
		display: flex;
		flex-direction: row;
		margin-inline-start: 0.4rem;
		height: calc(100vh - var(--padding-top));
		--card-width: 10vi;
	}

	main > :global(*) {
		width: 50%;
		overflow-y: scroll;
	}

	.grid-wrapper {
		width: 100%;
		container-type: inline-size;
	}

	.grid-wrapper :global(canvas) {
		max-width: 100cqi;
	}

	@media (max-width: 1680px) {
		:root {
			overflow: auto;
		}

		h1 {
			position: initial;
			padding-bottom: 1em;
		}

		main {
			flex-direction: column;
			--padding-top: 1rem;
			--card-width: 20vi;
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
