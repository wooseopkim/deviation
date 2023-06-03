<script lang="ts">
	import 'modern-normalize';
// this comment ensures modern-normalize to get loaded first
	import { browser } from '$app/environment';
	import { APP_NAME } from '$lib/constants';
	import '@fontsource/archivo-black';
	import '@fontsource/black-han-sans';

	let openGraph: {
		title: string;
		url: string;
		image: string;
	};
	export { openGraph as data };
</script>

<svelte:head>
	<title>{APP_NAME.toUpperCase()}</title>

	{#if !browser}
		<meta property="og:title" content={openGraph.title} />
		<meta property="og:type" content="website" />
		<meta property="og:url" content={openGraph.url} />
		<meta property="og:image" content={openGraph.image} />
	{/if}
</svelte:head>

<div>
	<slot />
</div>

<style>
	:root {
		font-family: 'Archivo Black', 'Black Han Sans', sans-serif;
		background-color: #fefefe;
		color: #202020;
	}

	div {
		width: 100vi;
		height: 100vb;
		display: flex;
		flex-direction: column;
		min-height: 100vb;
	}
</style>
