import type { Member } from './Member';
import tripleS from './tripleS';
import loona from './loona';
import type { MemberPath } from './MemberPath';
import type { Id } from './Id';

const groups = {
	tripleS,
	loona,
} as const;

export type Group = keyof typeof groups;

type HasThisStructure = {
	[key in Group]: {
		id: Id;
		keys: readonly string[];
		members: readonly Member[];
	};
};
groups as HasThisStructure;

export default groups;

export function getMember([group, member]: MemberPath): Member {
	const { members } = Object.values(groups).find(({ id }) => id === group) ?? {
		members: [] as readonly Member[],
	};
	return members.find(({ id }) => id === member) ?? ({} as Member);
}

export function getIndex([group, member]: MemberPath): number {
	const { members } = Object.values(groups).find(({ id }) => id === group) ?? {
		members: [] as readonly Member[],
	};
	return members.findIndex(({ id }) => id === member);
}
