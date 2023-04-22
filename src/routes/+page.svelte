<script lang="ts">
	import { allS } from '../triples/members';
	import MemberList from './MemberList.svelte';
	import dimension from './dimension';
	import registerQuery from '../store/query';
	import encodeShareCode from '../share-code/encode';
	import decodeShareCode from '../share-code/decode';

	registerQuery(dimension, 'dimension', {
		encode: encodeShareCode,
		decode: decodeShareCode,
	});
</script>

<h1>Deviation</h1>
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
		text-transform: uppercase;
		font-size: 16vmin;
		user-select: none;
		margin: 0;
		position: fixed;
	}

	main {
		display: flex;
		flex-direction: row;
		--padding-top: 16vmin;
		padding-top: var(--padding-top);
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
			--padding-top: 0;
			--card-width: 20vi;
		}

		main > :global(*) {
			width: 100%;
			overflow-y: inherit;
		}
	}
</style>
