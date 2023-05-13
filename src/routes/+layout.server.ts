import decodeShareCode from '$lib/share-code/decode.js';

export async function load({ url }) {
	const openGraph = {
		url: url.href,
		title: undefined as string | undefined,
		image: undefined as string | undefined,
	};

	const code = url.searchParams.get('palette');
	if (code === null || code.length === 0) {
		return openGraph;
	}
	const palette = decodeShareCode(code);

	const { title } = palette;
	const suffix = title.length > 0 ? `/${title}` : '';

	openGraph.title = 'DEVIATION' + suffix;
	openGraph.image = `${url.origin}/${code}.jpg`;

	return openGraph;
}
