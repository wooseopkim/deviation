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
	import Button from './Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import { allPresets, customPresets } from './presets';
	import { derived } from 'svelte/store';
	import LoadingButton from './LoadingButton.svelte';

	registerLocalStorage(palette, 'palette');
	registerQuery(palette, 'palette', {
		encode: encodeShareCode,
		decode: decodeShareCode,
	});
	registerLocalStorage(customPresets, 'customPresets');

	const gitHubRepositoryUrl = 'https://github.com/wooseopkim/deviation';

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

	function onCopyShareCode(
		{
			setTask,
		}: {
			setTask: (value: Promise<void>, text: string) => void;
		},
		unit: SubUnit
	) {
		const code = encodeShareCode(unit);
		window.navigator.clipboard.writeText(code);
		const wait = new Promise<void>((resolve) => setTimeout(resolve, 1000));
		setTask(wait, `Copied ${code}`);
	}

	function onLoadShareCode() {
		const code = prompt('Share code:') ?? '';
		if (code.length === 0) {
			return;
		}
		try {
			const unit = decodeShareCode(code);
			palette.set(unit);
		} catch {
			alert(`Invalid code: ${code}`);
		}
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
					<Button on:click={() => onAddAll(preset.members)}>Add all</Button>
					<Button on:click={() => onReplace(preset)}>Replace</Button>
					{#if !builtIn}
						<Button on:click={() => onDelete(preset)}>Delete</Button>
					{/if}
					<LoadingButton
						enabled={preset.members.length > 0}
						on:click={(e) => onCopyShareCode(e.detail, preset)}
					>
						Copy share code
					</LoadingButton>
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
				<Button enabled={$palette.title.length > 0} on:click={onClearTitle}>Clear title</Button>
				<Button enabled={$palette.members.length > 0} on:click={onClearMembers}>
					Clear members
				</Button>
				<Button enabled={$palette.members.length > 0} on:click={onSavePreset}>
					Save as preset
				</Button>
				<LoadingButton
					enabled={$palette.members.length > 0}
					on:click={(e) => onCopyShareCode(e.detail, $palette)}
				>
					Copy share code
				</LoadingButton>
				<Button on:click={onLoadShareCode}>Load share code</Button>
			</Toolbar>
		</MemberList>
		{#if $palette.members.length > 0}
			<SectionTitle>Image</SectionTitle>
			<div class="grid-wrapper">
				<ImageGrid title={$palette.title} members={$palette.members} />
			</div>
		{/if}
		<SectionTitle>About this app</SectionTitle>
		<article>
			<p>Hi!</p>
			<p>
				This app is not affiliated with any company including Modhaus. This is just a non-commercial
				fan app. Any right to use group and member names commercially belongs to their companies.
				The profile pictures are their intellectual properties. The app displays images by linking
				to YouTube thumbnails, but I'm still looking for a way to use images that are 100% safe to
				use in terms of copyright.
			</p>
			<p>
				If you find the app interesting and you're a WAV, you can send some Objekts to Cosmo
				username wooseop, but you don't have to. Same username on the official tripleS Discord
				server.
			</p>
			<p>
				You can see the source code at
				<a href={gitHubRepositoryUrl} target="_blank">
					{gitHubRepositoryUrl}
				</a>.
			</p>
		</article>
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

	.grid-wrapper {
		width: 100%;
		container-type: inline-size;
	}

	.grid-wrapper :global(canvas) {
		max-width: 100cqi;
	}

	article {
		--padding-horizontal: 1.4rem;
		--padding-vertical: 1rem;
		background-color: rgba(0, 0, 0, 0.27);
		padding-block-start: var(--padding-vertical);
		padding-block-end: var(--padding-vertical);
		padding-inline-start: var(--padding-horizontal);
		padding-inline-end: var(--padding-horizontal);
		flex-grow: 1;
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
