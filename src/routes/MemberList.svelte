<script lang="ts">
	import focus from './focus';
	import type { AllS } from '$lib/triples/members';
	import dimension from './dimension';
	import MemberCard from './MemberCard.svelte';
	import ListItem from './ListItem.svelte';

	export let members: readonly AllS[];

	let focused: number | undefined;
	let hovered: number | undefined;
	function onFocus(id: number, value: boolean) {
		focused = value ? id : undefined;
	}
	function onHover(id: number, value: boolean) {
		hovered = value ? id : undefined;
	}
	$: onFocusOrHoverChange([focused, hovered]);

	function onSelect(name: AllS) {
		dimension.update(({ members, ...rest }) => ({
			members: toggle(members, name),
			...rest,
		}));
	}

	function toggle(list: AllS[], name: AllS) {
		if (list.includes(name)) {
			const index = list.indexOf(name);
			return [...list.slice(0, index), ...list.slice(index + 1)];
		}
		return [...list, name];
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

	function getStatus(id: AllS, focus: AllS | undefined) {
		if (focus === undefined) {
			return 'normal';
		}
		if (focus === id) {
			return 'focused';
		}
		return 'blurred';
	}
</script>

<slot name="title" />
<slot name="toolbar" />
<form>
	{#each members as name, index}
		<ListItem
			className={getStatus(name, $focus)}
			on:focus={(e) => onFocus(index, e.detail)}
			on:hover={(e) => onHover(index, e.detail)}
			on:select={() => onSelect(name)}
		>
			<MemberCard {name} />
		</ListItem>
	{/each}
</form>

<style>
	form {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		align-items: baseline;
	}
</style>
