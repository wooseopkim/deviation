import type { Member } from './Member';
import tripleS from './tripleS';
import loona from './loona';
import type { MemberPath } from './MemberPath';
import type { Id } from './Id';
import memoized from '$lib/memoize';

const groups = {
	tripleS,
	loona,
} as const;

export type Group = keyof typeof groups;

type GenericGroup = {
	[key in Group]: {
		id: Id;
		keys: readonly string[];
		members: readonly Member[];
	};
};
groups as GenericGroup;

export default groups;

class DecoratorContext {
	@memoized()
	static getMember([group, member]: MemberPath): Member {
		const { members } = Object.values(groups).find(({ id }) => id === group) ?? {
			members: [] as readonly Member[],
		};
		return members.find(({ id }) => id === member) ?? ({} as Member);
	}

	@memoized()
	static getIndex([group, member]: MemberPath): number {
		const { members } = Object.values(groups).find(({ id }) => id === group) ?? {
			members: [] as readonly Member[],
		};
		return members.findIndex(({ id }) => id === member);
	}

	@memoized()
	static toPath<G extends Group>(group: G, key: (typeof groups)[G]['keys'][number]): MemberPath<G> {
		const { id: groupId, members } = groups[group] as GenericGroup[G];
		const memberId = members?.find(({ name }) => name === key)?.id ?? undefined;
		return [groupId, memberId] as MemberPath<G>;
	}
}

const { getMember, getIndex, toPath } = DecoratorContext;

export { getMember, getIndex, toPath };
