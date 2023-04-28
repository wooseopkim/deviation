<script lang="ts">
	import type groups from '$lib/groups';
	import type { Group } from '$lib/groups';
	import type { Writable } from 'svelte/store';
	import Button from './Button.svelte';

	export let data: typeof groups;
	export let target: Writable<Group | undefined>;

	function onClick(key: string) {
		target.set(key as Group);
	}

	function getStatus(key: string, _deps: unknown[]) {
		if (key === $target) {
			return 'selected';
		}
		return '';
	}
</script>

<nav>
	<ul>
		{#each Object.entries(data) as [key]}
			<li class={getStatus(key, [$target])}>
				<Button on:click={() => onClick(key)}>
					{key}
				</Button>
			</li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		margin: 0;
		padding: 0;
	}

	li {
		display: inline-block;
	}

	li.selected {
		padding-block-end: 0.2rem;
		border-bottom: 0.3rem solid rgba(0, 0, 0, 0.9);
	}

	li::marker {
		content: none;
	}

	li:not(:first-of-type) {
		margin-inline-start: 0.4rem;
	}
</style>
