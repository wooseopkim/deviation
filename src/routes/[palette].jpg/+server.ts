import { renderGrid } from '$lib/image/grid.js';
import decodeShareCode from '$lib/share-code/decode.js';
import { createCanvas, registerFont } from 'canvas';

registerFont('static/fonts/ArchivoBlack-Regular.ttf', {
	family: 'Archivo Black',
});

export async function GET({ request, params, url }) {
	const code = params.palette;

	const contentType = request.headers.get('Content-Type');
	if (contentType === 'text/html') {
		const location = new URL(url);
		url.pathname = '/';
		url.searchParams.set('palette', code);
		return new Response(undefined, {
			status: 307,
			headers: {
				Location: location.toString(),
			},
		});
	}

	const eTag = request.headers.get('ETag') ?? '';
	if (eTag.length > 0) {
		return new Response(undefined, {
			status: 304,
		});
	}

	if (code === null || code.length === 0) {
		return new Response('Invalid code', {
			status: 400,
		});
	}

	const palette = decodeShareCode(code);
	const canvas = createCanvas(512, 512);
	await renderGrid(canvas, palette, { hideFooter: true, hideImage: true });
	const buffer = canvas.toBuffer('image/jpeg', {
		quality: 0.85,
		progressive: true,
	});

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'image/jpeg',
			ETag: code,
		},
	});
}
