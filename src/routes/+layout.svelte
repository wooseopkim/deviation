<script lang="ts">
	import { browser } from '$app/environment';
	import { APP_NAME } from '$lib/constants';

	let openGraph: {
		title: string;
		url: string;
		image: string;
	};
	export { openGraph as data };
</script>

<svelte:head>
	<title>{APP_NAME.toUpperCase()}</title>

	<link rel="stylesheet" href="https://unpkg.com/normalize.css/normalize.css" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/archivo-black/400.min.css"
	/>

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
		font-family: 'Archivo Black', sans-serif;
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
