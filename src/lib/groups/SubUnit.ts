import type { Group } from '$lib/groups';
import type { MemberPath } from '$lib/groups/MemberPath';

export type SubUnit = {
	title: string;
	members: MemberPath<Group>[];
};
