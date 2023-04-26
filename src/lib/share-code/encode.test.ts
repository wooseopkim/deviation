import { toPath } from '$lib/groups';
import type { SubUnit } from '$lib/groups/SubUnit';
import { describe, expect, it } from 'vitest';
import decodeShareCode from './decode';
import encodeShareCode from './encode';

describe(encodeShareCode.name, () => {
	it('returns non-empty string', () => {
		const unit: SubUnit = {
			title: 'LET THERE BE LIGHT',
			members: [
				['L', '1'],
				['S', 'a'],
			],
		};

		const code = encodeShareCode(unit);

		expect(code).not.toHaveLength(0);
	});

	it('returns string of decent length', () => {
		const unit: SubUnit = {
			title: 'Acid Angel from Asia',
			members: [
				toPath('tripleS', 'NaKyoung'),
				toPath('tripleS', 'HyeRin'),
				toPath('tripleS', 'YuBin'),
				toPath('tripleS', 'YooYeon'),
			],
		};

		const code = encodeShareCode(unit);

		expect(code.length).lessThanOrEqual(64);
	});

	it('is deterministic', () => {
		const unit: SubUnit = {
			title: 'LET THERE BE LIGHT',
			members: [
				['L', '1'],
				['S', 'a'],
			],
		};

		const code = encodeShareCode(unit);
		const retrieved = decodeShareCode(code);

		expect(unit).toStrictEqual(retrieved);
	});
});
