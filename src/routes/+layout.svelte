<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/normalize.css/normalize.css" />
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/@fontsource/archivo-black@4.5.9/400.min.css"
	/>
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
