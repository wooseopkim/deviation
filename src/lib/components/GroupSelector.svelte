<script lang="ts">
	import type { Group } from '$lib/groups';
	import groups from '$lib/groups';
	import { getThumbnail } from '$lib/thumbnail';
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

	function startPreloading(key: string) {
		if ($target === key) {
			return;
		}
		const videoIds = groups[key as Group].members
			.map(({ videoId }) => videoId ?? '')
			.filter(Boolean);
		for (const videoId of videoIds) {
			const link = document.createElement('link');
			link.rel = 'preload';
			link.href = getThumbnail(videoId);
			link.as = 'image';
			link.dataset['key'] = key;
			document.head.appendChild(link);
		}
	}

	function cancelPreloading(key: string) {
		const links = document.head.querySelectorAll(`[data-key="${key}"]`);
		for (const link of links) {
			link.remove();
		}
	}
</script>

<nav>
	<ul>
		{#each Object.entries(data) as [key]}
			<li class={getStatus(key, [$target])}>
				<Button
					on:click={() => onClick(key)}
					on:mouseover={() => startPreloading(key)}
					on:mouseout={() => cancelPreloading(key)}
					on:touchstart={() => startPreloading(key)}
					on:touchend={() => cancelPreloading(key)}
					on:focus={() => startPreloading(key)}
					on:blur={() => cancelPreloading(key)}
				>
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
