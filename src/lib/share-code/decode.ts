import { allS } from '../triples/members';
import type { Dimension } from './data';

export default function decodeShareCode(encoded: string): Dimension {
	const code = decodeURIComponent(window.atob(encoded));
	const [_versionArray, titleArray, ordered, _sorted] = code.split('/').map((x) => x.split(''));
	const title = titleArray?.join('') ?? '';
	const indices = ordered?.map((char) => char.charCodeAt(0) - 'A'.charCodeAt(0)) ?? [];
	const members = indices.map((index) => allS[index]);
	return {
		title,
		members,
	};
}
