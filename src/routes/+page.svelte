<script lang="ts">
	import { allS } from '$lib/triples/members';
	import MemberList from './MemberList.svelte';
	import dimension from './dimension';
	import encodeShareCode from '$lib/share-code/encode';
	import decodeShareCode from '$lib/share-code/decode';
	import registerQuery from '$lib/store/query';
	import registerLocalStorage from '$lib/store/local-storage';

	registerLocalStorage(dimension, 'dimension');
	registerQuery(dimension, 'dimension', {
		encode: encodeShareCode,
		decode: decodeShareCode,
	});
</script>

<h1><super>https://</super><span><strong>deviation</strong><span>.by.wooseop.kim</span></h1>
<main>
	<MemberList title="All members" members={allS} baseTabIndex={0} />
	<MemberList
		title={$dimension.title}
		titleEditable={true}
		placeholder="Your unnamed Dimension — click here to edit"
		members={$dimension.members}
		baseTabIndex={100}
	/>
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
		overflow-y: auto;
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
