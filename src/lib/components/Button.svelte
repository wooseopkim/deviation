<script lang="ts">
	export let enabled = true;
</script>

<button disabled={!enabled} on:click on:mouseover on:mouseout on:touchstart on:touchend on:focus on:blur>
	<slot />
</button>

<style>
	button {
		all: unset;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.9);
		color: white;
		--padding-vertical: 0.8rem;
		padding-inline-start: 0.2rem;
		padding-inline-end: 1rem;
		padding-block-start: var(--padding-vertical);
		padding-block-end: var(--padding-vertical);
	}

	button:hover, button:focus {
		background-color: rgba(0, 0, 0, 0.7);
	}

	button:disabled {
		opacity: 0.3;
		cursor: default;
	}
</style>
