import { toPath } from ".";
import type { SubUnit } from "./SubUnit";

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
];

export default presets;
