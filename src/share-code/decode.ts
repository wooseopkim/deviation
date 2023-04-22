import { allS } from '../triples/members';

export default function decodeShareCode(encoded: string) {
	const code = window.atob(encoded);
	const [ordered, _] = code.split('/').map((x) => x.split(''));
	const indices = ordered.map((char) => char.charCodeAt(0) - 'A'.charCodeAt(0));
	return indices.map((index) => allS[index]);
}
