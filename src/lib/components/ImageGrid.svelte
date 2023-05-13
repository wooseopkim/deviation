<script lang="ts">
	import type { SubUnit } from '$lib/groups/SubUnit';
	import { renderGrid } from '$lib/image/grid';
	$: render([canvas, data]);

	export let data: SubUnit;

	let canvas: HTMLCanvasElement;

	async function render(_deps: unknown[]) {
		await renderGrid(canvas, data);
	}
</script>

<canvas width={1024} height={768} bind:this={canvas} />
