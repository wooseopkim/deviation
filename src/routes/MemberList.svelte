<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { AllS } from '../triples/members';
	import dimension from '../store/dimension';
	import MemberCard from './MemberCard.svelte';
	import ListItem from './ListItem.svelte';

	export let title: string;
	export let titleEditable: boolean = false;
	export let placeholder: string = '';

	export let members: readonly AllS[];
	export let focus: AllS | undefined;
	export let baseTabIndex = 0;

	const dispatch = createEventDispatcher<{
		focus: AllS;
		blur: undefined;
	}>();

	let focused: number | undefined;
	let hovered: number | undefined;
	function onFocus(id: number, value: boolean) {
		focused = value ? id : undefined;
	}
	function onHover(id: number, value: boolean) {
		hovered = value ? id : undefined;
	}
	$: onFocusOrHoverChange([focused, hovered]);

	function onTitleChange(title: string) {
		dimension.update(({ title: _, ...rest }) => ({
			title,
			...rest,
		}));
	}

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
			dispatch('focus', members[focused]);
			return;
		}
		if (hovered !== undefined) {
			dispatch('focus', members[hovered]);
			return;
		}
		dispatch('blur');
	}

	function getStatus(id: AllS, _deps: unknown[]) {
		if (focus === undefined) {
			return 'normal';
		}
		if (focus === id) {
			return 'focused';
		}
		return 'blurred';
	}
</script>

<section>
	{#if titleEditable}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<h3
			contenteditable="true"
			bind:textContent={title}
			{placeholder}
			tabindex={baseTabIndex}
			on:input={(e) => onTitleChange(e.currentTarget?.textContent ?? '')}
		>
			{title}
		</h3>
	{:else}
		<h3>{title}</h3>
	{/if}
	<form>
		{#each members as name, index}
			<ListItem
				tabIndex={baseTabIndex + index + 1}
				className={getStatus(name, [focus])}
				on:focus={(e) => onFocus(index, e.detail)}
				on:hover={(e) => onHover(index, e.detail)}
				on:select={() => onSelect(name)}
			>
				<MemberCard {name} />
			</ListItem>
		{/each}
	</form>
</section>

<style>
	:root {
		--title-max-width: 80%;
	}

	section {
		height: 100%;
	}

	h3 {
		max-width: var(--title-max-width);
		--padding-horizontal: 0.25em;
		--padding-vertical: 1em;
		padding-block-start: var(--padding-vertical);
		padding-block-end: var(--padding-vertical);
		padding-inline-start: var(--padding-horizontal);
		padding-inline-end: var(--padding-horizontal);
		margin: 0;
	}

	h3[contenteditable='true']:not(:focus):not(:hover):empty::before {
		max-width: var(--title-max-width);
		content: attr(placeholder);
		opacity: 0.3;
		font-style: italic;
		user-select: none;
	}

	form {
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		align-items: baseline;
	}
</style>
