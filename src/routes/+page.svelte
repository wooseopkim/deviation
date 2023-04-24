<script lang="ts">
	import MemberList from './MemberList.svelte';
	import palette from './palette';
	import encodeShareCode from '$lib/share-code/encode';
	import decodeShareCode from '$lib/share-code/decode';
	import registerQuery from '$lib/store/query';
	import registerLocalStorage from '$lib/store/local-storage';
	import SectionTitle from './SectionTitle.svelte';
	import ImageGrid from './ImageGrid.svelte';
	import groups from '$lib/groups';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import createPartial from '$lib/store/partial';
	import Toolbar from './Toolbar.svelte';
	import ToolbarButton from './ToolbarButton.svelte';

	registerLocalStorage(palette, 'palette');
	registerQuery(palette, 'palette', {
		encode: encodeShareCode,
		decode: decodeShareCode,
	});

	const all: MemberPath[] = groups.tripleS.members.map(({ id }) => ['S', id]);

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
</script>

<h1><super>https://</super><span><strong>deviation</strong><span>.by.wooseop.kim</span></span></h1>
<main>
	<section>
		<MemberList members={all}>
			<SectionTitle slot="title">All members</SectionTitle>
		</MemberList>
	</section>
	<section>
		<MemberList members={$palette.members}>
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
			</Toolbar>
		</MemberList>
		{#if $palette.members.length > 0}
			<SectionTitle>Image</SectionTitle>
			<ImageGrid title={$palette.title} members={$palette.members} />
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
		position: fixed;
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
	}

	h1 strong {
		text-transform: uppercase;
		font-size: 16vmin;
		line-height: 0.6em;
		margin-inline-start: var(--title-margin-start);
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
		--padding-top: 16vmin;
		padding-top: var(--padding-top);
		margin-inline-start: 0.4rem;
		height: calc(100vh - var(--padding-top));
		--card-width: 10vi;
	}

	main > :global(*) {
		width: 50%;
		overflow-y: scroll;
	}

	@media (max-width: 1680px) {
		:root {
			overflow: auto;
		}

		h1 {
			position: inherit;
		}

		main {
			flex-direction: column;
			--padding-top: 2rem;
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
