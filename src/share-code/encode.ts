import { allS, type AllS } from '../triples/members';

export default function encode(dimension: AllS[]) {
	const indices = dimension.map((name) => allS.indexOf(name));
	const ordered = indices.map((index) => String.fromCharCode(index + 'A'.charCodeAt(0)));
	const sorted = indices.map((index) => String.fromCharCode(index + 'a'.charCodeAt(0))).sort();
	const code = [ordered, sorted].map((x) => x.join('')).join('/');
	return window.btoa(code);
}
