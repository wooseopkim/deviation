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
	'JeongHaYeon',
	'ParkShiOn',
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
		color: undefined,
	} as const,
	{
		name: 'Mayu',
		id: 'p',
		videoId: 'tsuyF4z7Kns',
		color: undefined,
	} as const,
	{
		name: 'Lynn',
		id: 'q',
		videoId: 'S33GV97KXGk',
		color: undefined,
	} as const,
	{
		name: 'JooBin',
		id: 'r',
		videoId: 'Tig5Lt8N12Y',
		color: undefined,
	} as const,
	{
		name: 'JeongHaYeon',
		id: 's',
		videoId: 'bpVG7JttVVM',
		color: undefined,
	} as const,
	{
		name: 'ParkShiOn',
		id: 't',
		videoId: '_OTK4AZ0uHc',
		color: undefined,
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
