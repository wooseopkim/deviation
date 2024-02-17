import type { SubUnit } from './SubUnit';
import { toPath } from '.';

const presets: SubUnit[] = [
	{
		title: 'Acid Angel from Asia',
		members: [
			toPath('tripleS', 'NaKyoung'),
			toPath('tripleS', 'HyeRin'),
			toPath('tripleS', 'YuBin'),
			toPath('tripleS', 'YooYeon'),
		],
	},
	{
		title: '+(KR)ystal Eyes',
		members: [
			toPath('tripleS', 'SeoYeon'),
			toPath('tripleS', 'SooMin'),
			toPath('tripleS', 'ChaeYeon'),
			toPath('tripleS', 'JiWoo'),
		],
	},
	{
		title: 'EVOLution',
		members: [
			toPath('tripleS', 'YooYeon'),
			toPath('tripleS', 'ChaeYeon'),
			toPath('tripleS', 'NaKyoung'),
			toPath('tripleS', 'JiWoo'),
			toPath('tripleS', 'Kotone'),
			toPath('tripleS', 'SooMin'),
			toPath('tripleS', 'YeonJi'),
			toPath('tripleS', 'Mayu'),
		],
	},
	{
		title: 'LOVElution',
		members: [
			toPath('tripleS', 'YuBin'),
			toPath('tripleS', 'SeoYeon'),
			toPath('tripleS', 'Kaede'),
			toPath('tripleS', 'DaHyun'),
			toPath('tripleS', 'SoHyun'),
			toPath('tripleS', 'HyeRin'),
			toPath('tripleS', 'Nien'),
			toPath('tripleS', 'Xinyu'),
		],
	},
	{
		title: 'Aria',
		members: [
			toPath('tripleS', 'JiWoo'),
			toPath('tripleS', 'ChaeYeon'),
			toPath('tripleS', 'Kaede'),
			toPath('tripleS', 'DaHyun'),
			toPath('tripleS', 'Nien'),
		],
	},
	{
		title: 'NXT',
		members: [
			toPath('tripleS', 'Lynn'),
			toPath('tripleS', 'JooBin'),
			toPath('tripleS', 'HaYeon'),
			toPath('tripleS', 'ShiOn'),
		],
	},
	{
		title: '1/3',
		members: [
			toPath('LOONA', 'HeeJin'),
			toPath('LOONA', 'HyunJin'),
			toPath('LOONA', 'HaSeul'),
			toPath('LOONA', 'ViVi'),
		],
	},
	{
		title: 'ODD EYE CIRCLE',
		members: [toPath('LOONA', 'Kim Lip'), toPath('LOONA', 'JinSoul'), toPath('LOONA', 'Choerry')],
	},
	{
		title: 'yyxy',
		members: [
			toPath('LOONA', 'Yves'),
			toPath('LOONA', 'Chuu'),
			toPath('LOONA', 'Go Won'),
			toPath('LOONA', 'Olivia Hye'),
		],
	},
];

export default presets;
