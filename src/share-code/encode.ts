import { allS } from '../triples/members';
import type { Dimension } from './data';

const version = 1;

export default function encodeShareCode({ title, members }: Dimension) {
	if (title.length === 0 && members.length === 0) {
		return '';
	}
	const indices = members.map((name) => allS.indexOf(name));
	const ordered = indices.map((index) => String.fromCharCode(index + 'A'.charCodeAt(0)));
	const sorted = indices.map((index) => String.fromCharCode(index + 'a'.charCodeAt(0))).sort();
	const code = [version, title, ...[ordered, sorted].map((x) => x.join(''))].join('/');
	return window.btoa(code);
}
