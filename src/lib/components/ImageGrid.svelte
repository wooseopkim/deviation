<script lang="ts">
	import { getMember } from '$lib/groups';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import { getThumbnail } from '$lib/thumbnail';

	export let title: string;
	let targetMembers: MemberPath[];
	export { targetMembers as members };

	let canvas: HTMLCanvasElement;
	$: render([canvas, targetMembers]);

	const canvasWidth = 1024;
	const canvasHeight = 768;
	const fontUnit = 32;

	async function render(_deps: unknown[]) {
		const ctx = canvas?.getContext('2d');
		if (ctx === null || ctx === undefined) {
			return;
		}

		const fontFamily = getComputedStyle(document.body).fontFamily.split(',')?.[0] ?? 'sans-serif';
		ctx.font = `${fontUnit}px ${fontFamily}`;

		const bannerHeight = fontUnit * 2;
		const footerHeight = fontUnit * 2;
		const gridHeight = canvasHeight - bannerHeight - footerHeight;

		const remaining = [...targetMembers];

		const rows = remaining.length < 4 ? 1 : Math.round(Math.sqrt(remaining.length));
		const rowHeight = Math.round(gridHeight / rows);

		for (let i = 0; i < rows; i++) {
			const columns = Math.ceil(remaining.length / (rows - i));
			const cellWidth = Math.ceil(canvasWidth / columns);

			for (let j = 0; j < columns; j++) {
				const id = remaining.shift() as MemberPath;
				const startX = cellWidth * j;
				const startY = bannerHeight + rowHeight * i;

				const { color, videoId, name } = getMember(id);

				if (videoId === undefined) {
					ctx.fillStyle = 'darkgrey';
					ctx.fillRect(startX, startY, cellWidth, rowHeight);
				} else {
					await new Promise<void>((resolve) => {
						const img = new Image();
						img.onload = () => {
							const ratio = 0.6;
							let width = cellWidth;
							let height = rowHeight;
							if (width / height > img.width / img.height) {
								height = (img.height / img.width) * cellWidth;
							} else {
								width = (img.width / img.height) * rowHeight;
							}
							ctx.drawImage(
								img,
								(img.width * (1 - ratio)) / 2,
								(img.height * (1 - ratio)) / 2,
								img.width * ratio,
								img.height * ratio,
								startX,
								startY,
								width,
								height
							);
							resolve();
						};
						img.src = getThumbnail(videoId, 'medium');
					});
				}

				if (color !== undefined) {
					ctx.save();
					ctx.fillStyle = color;
					ctx.globalAlpha = 0.4;
					ctx.fillRect(startX, startY, cellWidth, rowHeight);
					ctx.restore();
				}

				ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
				ctx.fillRect(startX, startY, cellWidth, rowHeight);
				ctx.fillStyle = 'white';
				ctx.fillText(name, startX, startY + fontUnit);
			}
		}

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvasWidth, bannerHeight);
		ctx.fillStyle = 'white';
		ctx.fillText(title || 'My unnamed palette', 0, fontUnit);

		ctx.fillStyle = 'black';
		ctx.fillRect(0, canvasHeight - footerHeight, canvasWidth, footerHeight);
		ctx.fillStyle = 'white';
		ctx.fillText('generated on https://deviation.by.wooseop.kim', 0, canvasHeight - fontUnit);
	}
</script>

<canvas width={canvasWidth} height={canvasHeight} bind:this={canvas} />
