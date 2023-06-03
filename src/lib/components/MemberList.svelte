<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ListItem from './ListItem.svelte';
	import MemberCard from './MemberCard.svelte';
	import { type MemberPath, equalsMemberPath } from '$lib/groups/MemberPath';

	export let members: readonly MemberPath[];
	export let folded: boolean | undefined = undefined;
	export let focus: Writable<MemberPath | undefined>;

	let focused: number | undefined;
	let hovered: number | undefined;
	function onFocus(id: number, value: boolean) {
		focused = value ? id : undefined;
	}
	function onHover(id: number, value: boolean) {
		hovered = value ? id : undefined;
	}
	$: onFocusOrHoverChange([focused, hovered]);

	const dispatch = createEventDispatcher<{
		toggle: undefined;
		select: MemberPath;
	}>();

	function onSelect(id: MemberPath) {
		dispatch('select', id);
	}

	function onFocusOrHoverChange(_deps: unknown[]) {
		if (focused !== undefined) {
			focus.set(members[focused]);
			return;
		}
		if (hovered !== undefined) {
			focus.set(members[hovered]);
			return;
		}
		focus.set(undefined);
	}

	function onSummaryToggle(e: Event) {
		e.preventDefault();
		dispatch('toggle');
	}

	function getStatus(id: MemberPath, _deps: unknown[]) {
		const currentFocus = $focus;
		if (currentFocus === undefined) {
			return 'normal';
		}
		if (equalsMemberPath(currentFocus, id)) {
			return 'focused';
		}
		return 'blurred';
	}
</script>

<details class={folded !== undefined ? 'enabled' : 'disabled'} open={!folded}>
	<summary on:click={onSummaryToggle}>
		<slot name="title" />
	</summary>
	<slot name="toolbar" />
	<form>
		{#each members as id, index}
			{#key id.join('')}
				<ListItem
					className={getStatus(id, [$focus])}
					on:focus={(e) => onFocus(index, e.detail)}
					on:hover={(e) => onHover(index, e.detail)}
					on:select={() => onSelect(id)}
				>
					<MemberCard {id} />
				</ListItem>
			{/key}
		{/each}
	</form>
</details>

<style>
	summary {
		user-select: none;
	}

	summary:focus {
		border: none;
	}

	details.enabled summary {
		cursor: pointer;
	}

	details.disabled summary::marker {
		color: transparent;
	}

	summary > :global(*) {
		display: inline-block;
		width: 100%;
	}

	form {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		align-items: baseline;
	}
</style>
