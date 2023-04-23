import type { MemberPath } from '$lib/groups/MemberPath';
import type { SubUnit } from '../groups/SubUnit';

export default function decodeShareCode(encoded: string): SubUnit {
	const code: string = decodeURIComponent(atob(encoded));
	const [_version, title, ordered, _sorted] = code.split(':');
	const members: MemberPath[] = [];
	for (let i = 0; i + 1 < ordered?.length; i += 2) {
		const member = [ordered[i], ordered[i + 1]] as MemberPath;
		members.push(member);
	}
	return {
		title,
		members,
	};
}
