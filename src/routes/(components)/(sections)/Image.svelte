<script lang="ts">
	import ImageGrid from '$lib/components/ImageGrid.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';

	export let data: SubUnit;
</script>

<SectionTitle>Image</SectionTitle>
<div class="grid-wrapper">
	<ImageGrid {data} />
</div>

<style>
	.grid-wrapper {
		width: 100%;
		container-type: inline-size;
	}

	.grid-wrapper :global(canvas) {
		max-width: 100cqi;
	}
</style>
