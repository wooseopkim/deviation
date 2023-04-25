import type { Group } from '$lib/groups';
import type { MemberPath } from '$lib/groups/MemberPath';

export type SubUnit<G extends Group = Group> = {
	title: string;
	members: MemberPath<G>[];
};
