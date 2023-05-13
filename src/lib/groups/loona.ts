import type { Member } from './Member';

const keys = [
	'HeeJin',
	'HyunJin',
	'HaSeul',
	'YeoJin',
	'ViVi',
	'Kim Lip',
	'JinSoul',
	'Choerry',
	'Yves',
	'Chuu',
	'Go Won',
	'Olivia Hye',
] as const;

const members = [
	{
		name: 'HeeJin',
		id: '1',
		color: '#F4028E',
		videoId: '-FCYE87P5L0',
	} as const,
	{
		name: 'HyunJin',
		id: '2',
		color: '#FFCB07',
		videoId: 'mybsDDymrsc',
	},
	{
		name: 'HaSeul',
		id: '3',
		color: '#01954A',
		videoId: '6a4BWpBJppI',
	},
	{
		name: 'YeoJin',
		id: '4',
		color: '#F47021',
		videoId: 'thpTOAS1Vgg',
	},
	{
		name: 'ViVi',
		id: '5',
		color: '#F4A1B5',
		videoId: 'ZNcBZM5SvbY',
	},
	{
		name: 'Kim Lip',
		id: '6',
		color: '#EB1326',
		videoId: '_qJEoSa3Ie0',
	},
	{
		name: 'JinSoul',
		id: '7',
		color: '#1313D6',
		videoId: 'RWeyOyY_puQ',
	},
	{
		name: 'Choerry',
		id: '8',
		color: '#7632A0',
		videoId: 'VBbeuXW8Nko',
	},
	{
		name: 'Yves',
		id: '9',
		color: '#7A0332',
		videoId: 'LIDe-yTxda0',
	},
	{
		name: 'Chuu',
		id: 'A',
		color: '#F7917E',
		videoId: 'BVVfMFS3mgc',
	},
	{
		name: 'Go Won',
		id: 'B',
		color: '#39BB9D',
		videoId: 'm5qwcYL8a0o',
	},
	{
		name: 'Olivia Hye',
		id: 'C',
		color: '#787A7D',
		videoId: 'UkY8HvgvBJ8',
	},
] as const;

export default {
	id: 'L',
	keys,
	members: members as readonly Member<
		(typeof members)[number]['name'],
		(typeof members)[number]['id']
	>[],
} as const;
