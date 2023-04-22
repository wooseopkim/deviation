export const largeS = [
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
] as const;
export type LargeS = (typeof largeS)[number];

export const smallS = ['S15', 'S16'] as const;
export type SmallS = (typeof smallS)[number];

export const allS = [...largeS, ...smallS] as const;
export type AllS = (typeof allS)[number];

export type Known = {
	color: `#${string}`;
	revealVideoId: string;
};

type Unknown = {
	[key in keyof Known]: undefined;
} & {
	unknown: true;
	teaserVideoId?: string;
};

export type Member = Known | Unknown;

export const members: {
	[largeS in LargeS]: Known;
} & {
	[smallS in SmallS]: Unknown;
} = {
	SeoYeon: {
		revealVideoId: 'jn2hiI7rqTA',
		color: '#4695CE',
	},
	HyeRin: {
		revealVideoId: 's8gVSZGj0eg',
		color: '#8067CC',
	},
	JiWoo: {
		revealVideoId: 'p4De1B1_fgg',
		color: '#FFF925',
	},
	ChaeYeon: {
		revealVideoId: 'SHEG7dGmQNs',
		color: '#8EBE44',
	},
	YooYeon: {
		revealVideoId: '9MmAfgGp5kY',
		color: '#D94385',
	},
	SooMin: {
		revealVideoId: '06wTMW8Dmmg',
		color: '#EC8AA5',
	},
	NaKyoung: {
		revealVideoId: 'MdU7A0ZY0e0',
		color: '#519BA7',
	},
	YuBin: {
		revealVideoId: 'y17ziu1sN9M',
		color: '#FEE5E4',
	},
	Kaede: {
		revealVideoId: 'u8ppSyqVifM',
		color: '#F5CB58',
	},
	DaHyun: {
		revealVideoId: 'tuGbExoxJEk',
		color: '#FF9AD5',
	},
	Kotone: {
		revealVideoId: 'sgofk7_3Auc',
		color: '#FFDF05',
	},
	YeonJi: {
		revealVideoId: 'zm0RcfeLn5E',
		color: '#627BFE',
	},
	Nien: {
		revealVideoId: 'wEYqWLA9E1o',
		color: '#FF9540',
	},
	SoHyun: {
		revealVideoId: 'cw2MwQ4p9FA',
		color: '#1322B6',
	},
	S15: {
		unknown: true,
		revealVideoId: undefined,
		color: undefined,
	},
	S16: {
		unknown: true,
		revealVideoId: undefined,
		color: undefined,
	},
} as const;

export function isKnown(member: Member): member is Known {
	return !('unknown' in member);
}
