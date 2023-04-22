<script lang="ts">
	import { allS, type AllS } from '../triples/members';
	import MemberList from './MemberList.svelte';

	let dimension: AllS[] = [];

	let focus: AllS | undefined;
	function onFocus(name: AllS) {
		focus = name;
	}
	function onFocusOut() {
		focus = undefined;
	}

	function onSelect(name: AllS) {
		if (dimension.includes(name)) {
			const index = dimension.indexOf(name);
			dimension = [...dimension.slice(0, index), ...dimension.slice(index + 1)];
			return;
		}
		dimension = [...dimension, name];
	}
</script>

<h1>Deviation</h1>
<main>
	<MemberList
		title="All members"
		members={allS}
		on:focus={(e) => onFocus(e.detail)}
		on:blur={() => onFocusOut()}
		{focus}
		on:select={(e) => onSelect(e.detail)}
		baseTabIndex={0}
	/>
	<MemberList
		title=""
		titleEditable={true}
		placeholder="Your unnamed Dimension — click here to edit"
		members={dimension}
		on:focus={(e) => onFocus(e.detail)}
		on:blur={() => onFocusOut()}
		{focus}
		on:select={(e) => onSelect(e.detail)}
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
