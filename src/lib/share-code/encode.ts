import type { SubUnit } from '../groups/SubUnit';

const version = 1;

export default function encodeShareCode({ title, members }: SubUnit) {
	if (title.length === 0 && members.length === 0) {
		return '';
	}
	const ordered: string[] = members.map(([group, member]) => `${group}${member}`);
	const code: string = [version, title, ordered.join('')].join(':');
	const base64 = btoa(encodeURIComponent(code));
	const base64url = base64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
	return base64url;
}
