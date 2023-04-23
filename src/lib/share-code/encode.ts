import type { SubUnit } from '../groups/SubUnit';

const version = 1;

export default function encodeShareCode({ title, members }: SubUnit) {
	if (title.length === 0 && members.length === 0) {
		return '';
	}
	const ordered: string[] = members.map(([group, member]) => `${group}${member}`);
	const sorted: string[] = ordered.sort();
	const code: string = [version, title, ...[ordered, sorted].map((x) => x.join(''))].join(':');
	return btoa(encodeURIComponent(code));
}
