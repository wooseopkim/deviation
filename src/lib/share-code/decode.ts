import type { MemberPath } from '$lib/groups/MemberPath';
import type { SubUnit } from '../groups/SubUnit';

export default function decodeShareCode(encoded: string): SubUnit {
	const base64url = encoded;
	const base64 = padBase64Url(base64url.replaceAll('-', '+').replaceAll('_', '/'));
	const code = decodeURIComponent(atob(base64));
	const [_version, title, ordered] = code.split(':');
	const members: MemberPath[] = [];
	for (let i = 0; i + 1 < ordered?.length; i += 2) {
		const member = [ordered[i], ordered[i + 1]] as MemberPath;
		members.push(member);
	}
	return {
		title: title ?? '',
		members,
	};
}

function padBase64Url(s: string) {
	return s.padEnd(s.length + (4 - s.length % 4) % 4, '=');
}
