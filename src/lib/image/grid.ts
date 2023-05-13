import { browser } from '$app/environment';
import { getMember } from '$lib/groups';
import type { MemberPath } from '$lib/groups/MemberPath';
import type { SubUnit } from '$lib/groups/SubUnit';
import { getThumbnail } from '$lib/thumbnail';
import type {
	Canvas as NodeCanvas,
	CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
	Image as NodeImage,
} from 'canvas';

const fontUnit = 32;

type Options = {
	hideHeader: boolean;
	hideNames: boolean;
	hideFooter: boolean;
	hideImage: boolean;
};

export async function renderGrid(
	canvas: NodeCanvas | HTMLCanvasElement | undefined,
	{ title, members }: SubUnit,
	{
		hideHeader = false,
		hideNames = false,
		hideFooter = false,
		hideImage = false,
	}: Partial<Options> = {}
) {
	if (canvas === undefined) {
		return;
	}
	const ctx = get2dContext(canvas);
	if (ctx === null || ctx === undefined) {
		return;
	}

	const fontFamily = browser
		? getComputedStyle(document.body).fontFamily.split(',')?.[0] ?? 'sans-serif'
		: 'Archivo Black';
	ctx.font = `${fontUnit}px ${fontFamily}`;

	const bannerHeight = hideHeader ? 0 : fontUnit * 2;
	const footerHeight = hideFooter ? 0 : fontUnit * 2;
	const gridHeight = canvas.height - bannerHeight - footerHeight;

	const remaining = [...members];

	const rows = remaining.length < 4 ? 1 : Math.round(Math.sqrt(remaining.length));
	const rowHeight = Math.round(gridHeight / rows);

	for (let i = 0; i < rows; i++) {
		const columns = Math.ceil(remaining.length / (rows - i));
		const cellWidth = Math.ceil(canvas.width / columns);

		for (let j = 0; j < columns; j++) {
			const id = remaining.shift() as MemberPath;
			const startX = cellWidth * j;
			const startY = bannerHeight + rowHeight * i;

			const { color, videoId, name } = getMember(id);

			if (hideImage || videoId === undefined) {
				ctx.fillStyle = 'darkgrey';
				ctx.fillRect(startX, startY, cellWidth, rowHeight);
			} else {
				const img = await newImage();
				await new Promise<void>((resolve) => {
					img.onload = () => {
						const ratio = 0.6;
						let width = cellWidth;
						let height = rowHeight;
						if (width / height > img.width / img.height) {
							height = (img.height / img.width) * cellWidth;
						} else {
							width = (img.width / img.height) * rowHeight;
						}
						drawImageWith(ctx, img)(
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

			if (!hideNames) {
				ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
				ctx.fillRect(startX, startY, cellWidth, rowHeight);
				ctx.fillStyle = 'white';
				ctx.fillText(name, startX, startY + fontUnit);
			}
		}
	}

	if (!hideHeader) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, bannerHeight);
		ctx.fillStyle = 'white';
		ctx.fillText(title || 'My unnamed palette', 0, fontUnit);
	}

	if (!hideFooter) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, canvas.height - footerHeight, canvas.width, footerHeight);
		ctx.fillStyle = 'white';
		ctx.fillText('generated on https://deviation.by.wooseop.kim', 0, canvas.height - fontUnit);
	}
}

async function newImage() {
	if (browser) {
		return new Image();
	}
	const { Image: NodeImage } = await import('canvas');
	return new NodeImage();
}

// without this function, TS will have difficulties with the type of canvas?.getContext('2d')
function get2dContext(
	canvas: NodeCanvas | HTMLCanvasElement | undefined
): CanvasRenderingContext2D | NodeCanvasRenderingContext2D | null | undefined {
	return canvas?.getContext('2d') as ReturnType<typeof get2dContext>;
}

// without this function, TS will have difficulties with the type of ctx.drawImage
function drawImageWith(
	ctx: CanvasRenderingContext2D | NodeCanvasRenderingContext2D,
	img: HTMLImageElement | NodeImage
) {
	if ('id' in img) {
		return (ctx as CanvasRenderingContext2D).drawImage.bind(ctx, img);
	}
	return (ctx as NodeCanvasRenderingContext2D).drawImage.bind(ctx, img);
}
