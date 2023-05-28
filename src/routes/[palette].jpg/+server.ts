import archivoBlack from '$lib/assets/fonts/ArchivoBlack-Regular.ttf';
import { renderGrid } from '$lib/image/grid.js';
import decodeShareCode from '$lib/share-code/decode.js';
import { createCanvas, registerFont } from 'canvas';
import path from 'path';

const builtOnNetlify = process.env.NETLIFY === 'true';
let initialized = false;

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

	if (!initialized) {
		const runningOnNetlify = process.env.NETLIFY_DEV === 'true';
		const onNetlify = builtOnNetlify || runningOnNetlify;
		const fontPath = onNetlify
			? // this may get broken, but there's no stable way to get output directory programatically as it's hard-coded
			  // https://github.com/sveltejs/kit/blob/0f4dd3d8637f7cccb50ed205dbbd2ad884988c8f/packages/adapter-netlify/index.js#L170
			  path.join(process.cwd(), '.netlify', 'server', archivoBlack)
			: path.join(process.cwd(), archivoBlack);
		registerFont(fontPath, {
			family: 'Archivo Black',
		});
		initialized = true;
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
