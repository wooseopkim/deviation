<script lang="ts">
	import type { MemberPath } from '$lib/groups/MemberPath';
	import renderToCanvas from '$lib/image/render';

	export let title: string;
	let targetMembers: MemberPath[];
	export { targetMembers as members };

	let canvas: HTMLCanvasElement;
	$: render([canvas, title, targetMembers]);

	const canvasWidth = 1024;
	const canvasHeight = 768;
	const fontUnit = 32;

	async function render(_deps: unknown[]) {
		const ctx = canvas?.getContext('2d');
		if (ctx === null || ctx === undefined) {
			return;
		}

		await renderToCanvas(ctx, {
			title,
			targetMembers,
			fontUnit,
			canvasWidth,
			canvasHeight,
		});
	}
</script>

<svelte:head>
	<meta property="og:title" content={'DEVIATION' + (title.length > 0 ? ` ${title}` : '')} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={location.href} />
	<meta property="og:image" content={canvas?.toDataURL()} />
</svelte:head>

<canvas width={canvasWidth} height={canvasHeight} bind:this={canvas} />
