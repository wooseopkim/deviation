import type { Member } from './Member';

const keys = ['HeeJin'] as const;

const members = [
	{
		name: 'HeeJin',
		id: '1',
		color: undefined,
		videoId: undefined,
	} as const,
] as const;

export default {
	id: 'L',
	keys,
	members: members as readonly Member<
		(typeof members)[number]['name'],
		(typeof members)[number]['id']
	>[],
} as const;
