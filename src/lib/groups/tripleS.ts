import type { Member } from './Member';

const keys = [
	'SeoYeon',
	'HyeRin',
	'JiWoo',
	'ChaeYeon',
	'YooYeon',
	'SooMin',
	'NaKyoung',
	'YuBin',
	'Kaede',
	'DaHyun',
	'Kotone',
	'YeonJi',
	'Nien',
	'SoHyun',
	'Xinyu',
	'Mayu',
	'Lynn',
	'JooBin',
	'HaYeon',
	'ShiOn',
	'ChaeWon',
	'Sullin',
	'SeoAh',
	'JiYeon',
] as const;

const members = [
	{
		name: 'SeoYeon',
		id: 'a',
		videoId: 'jn2hiI7rqTA',
		color: '#4695CE',
	} as const,
	{
		name: 'HyeRin',
		id: 'b',
		videoId: 's8gVSZGj0eg',
		color: '#8067CC',
	} as const,
	{
		name: 'JiWoo',
		id: 'c',
		videoId: 'p4De1B1_fgg',
		color: '#FFF925',
	} as const,
	{
		name: 'ChaeYeon',
		id: 'd',
		videoId: 'SHEG7dGmQNs',
		color: '#8EBE44',
	} as const,
	{
		name: 'YooYeon',
		id: 'e',
		videoId: '9MmAfgGp5kY',
		color: '#D94385',
	} as const,
	{
		name: 'SooMin',
		id: 'f',
		videoId: '06wTMW8Dmmg',
		color: '#EC8AA5',
	} as const,
	{
		name: 'NaKyoung',
		id: 'g',
		videoId: 'MdU7A0ZY0e0',
		color: '#519BA7',
	} as const,
	{
		name: 'YuBin',
		id: 'h',
		videoId: 'y17ziu1sN9M',
		color: '#FEE5E4',
	} as const,
	{
		name: 'Kaede',
		id: 'i',
		videoId: 'u8ppSyqVifM',
		color: '#F5CB58',
	} as const,
	{
		name: 'DaHyun',
		id: 'j',
		videoId: 'tuGbExoxJEk',
		color: '#FF9AD5',
	} as const,
	{
		name: 'Kotone',
		id: 'k',
		videoId: 'sgofk7_3Auc',
		color: '#FFDF05',
	} as const,
	{
		name: 'YeonJi',
		id: 'l',
		videoId: 'zm0RcfeLn5E',
		color: '#627BFE',
	} as const,
	{
		name: 'Nien',
		id: 'm',
		videoId: 'wEYqWLA9E1o',
		color: '#FF9540',
	} as const,
	{
		name: 'SoHyun',
		id: 'n',
		videoId: 'cw2MwQ4p9FA',
		color: '#1322B6',
	} as const,
	{
		name: 'Xinyu',
		id: 'o',
		videoId: '-YNkqDlBkMY',
		color: '#d51313',
	} as const,
	{
		name: 'Mayu',
		id: 'p',
		videoId: 'tsuyF4z7Kns',
		color: '#fe8e76',
	} as const,
	{
		name: 'Lynn',
		id: 'q',
		videoId: 'S33GV97KXGk',
		color: '#ac62b7',
	} as const,
	{
		name: 'JooBin',
		id: 'r',
		videoId: 'Tig5Lt8N12Y',
		color: '#b7f54c',
	} as const,
	{
		name: 'HaYeon',
		id: 's',
		videoId: 'bpVG7JttVVM',
		color: '#52d9bb',
	} as const,
	{
		name: 'ShiOn',
		id: 't',
		videoId: '_OTK4AZ0uHc',
		color: '#ff428a',
	} as const,
	{
		name: 'ChaeWon',
		id: 'u',
		videoId: 'BqtKrYKOPd4',
		color: '#c7a3e0',
	} as const,
	{
		name: 'Sullin',
		id: 'v',
		videoId: 'FhgCueX2QSc',
		color: '#7bba8d',
	} as const,
	{
		name: 'SeoAh',
		id: 'w',
		videoId: 'i6ZBVTYatSk',
		color: '#cff3ff',
	} as const,
	{
		name: 'JiYeon',
		id: 'x',
		videoId: 'e2i1kBtTspg',
		color: '#ffab62',
	} as const,
] as const;

export default {
	id: 'S',
	keys,
	members: members as readonly Member<
		(typeof members)[number]['name'],
		(typeof members)[number]['id']
	>[],
} as const;
