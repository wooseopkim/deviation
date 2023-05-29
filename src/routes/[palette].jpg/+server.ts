import archivoBlack from '$lib/assets/fonts/ArchivoBlack-Regular.ttf';
import blackHanSans from '$lib/assets/fonts/BlackHanSans-Regular.ttf';
import { renderGrid } from '$lib/image/grid.js';
import locateFile from '$lib/locateFile.js';
import decodeShareCode from '$lib/share-code/decode.js';
import { createCanvas, registerFont } from 'canvas';

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

	try {
		await registerFonts();
	} catch (e) {
		console.warn(e);
	}

	const palette = decodeShareCode(code);
	const canvas = createCanvas(512, 512);
	const fontFamily = [...fontsRegistered.keys(), 'sans-serif'].join(', ');
	await renderGrid(canvas, palette, { hideFooter: true, hideImage: true, fontFamily });
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

const fontsRegistered = new Map<string, string>();
async function registerFonts() {
	const fonts = [
		['Archivo Black', archivoBlack],
		['Black Han Sans', blackHanSans],
	] as const;
	for (const [family, path] of fonts) {
		if (fontsRegistered.has(family)) {
			continue;
		}
		const actualPath = await locateFile(process.cwd(), path);
		registerFont(actualPath, { family });
		fontsRegistered.set(family, actualPath);
	}
}
