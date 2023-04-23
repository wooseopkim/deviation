import type groups from '.';
import type { Group } from '.';
import type { Id } from './Id';

type GroupId<G extends Group = Group> = (typeof groups)[G]['id'];

type MemberList<G extends Group> = (typeof groups)[G]['members'];
type Member<G extends Group> = MemberList<G>[number];
type MemberId<G extends Group> = Member<G> extends { id: Id } ? Member<G>['id'] : never;

export type MemberPath<G extends Group = Group> = G extends infer X
	? X extends G
		? [GroupId<X>, MemberId<X>]
		: never
	: never;

export function equalsMemberPath(a: MemberPath, b: MemberPath) {
	const [v, w] = a;
	const [x, y] = b;
	return v === x && w === y;
}
