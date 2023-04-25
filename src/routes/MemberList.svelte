<script lang="ts">
	import focus from './focus';
	import palette from './palette';
	import MemberCard from './MemberCard.svelte';
	import ListItem from './ListItem.svelte';
	import { equalsMemberPath, type MemberPath } from '$lib/groups/MemberPath';

	export let members: readonly MemberPath[];
	export let summarized = true;

	let focused: number | undefined;
	let hovered: number | undefined;
	function onFocus(id: number, value: boolean) {
		focused = value ? id : undefined;
	}
	function onHover(id: number, value: boolean) {
		hovered = value ? id : undefined;
	}
	$: onFocusOrHoverChange([focused, hovered]);

	function onSelect(id: MemberPath) {
		palette.update(({ members, ...rest }) => ({
			members: toggle(members, id),
			...rest,
		}));
	}

	function toggle(list: MemberPath[], id: MemberPath) {
		const index = list.findIndex((x) => equalsMemberPath(x, id));
		if (index !== -1) {
			return [...list.slice(0, index), ...list.slice(index + 1)];
		}
		return [...list, id];
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
		if (summarized) {
			return;
		}
		e.preventDefault();
	}

	function getStatus(id: MemberPath, focus: MemberPath | undefined) {
		if (focus === undefined) {
			return 'normal';
		}
		if (equalsMemberPath(focus, id)) {
			return 'focused';
		}
		return 'blurred';
	}
</script>

<details class={summarized ? 'enabled' : 'disabled'} open={!summarized}>
	<summary on:click={onSummaryToggle}>
		<slot name="title" />
	</summary>
	<slot name="toolbar" />
	<form>
		{#each members as id, index}
			<ListItem
				className={getStatus(id, $focus)}
				on:focus={(e) => onFocus(index, e.detail)}
				on:hover={(e) => onHover(index, e.detail)}
				on:select={() => onSelect(id)}
			>
				<MemberCard {id} />
			</ListItem>
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
