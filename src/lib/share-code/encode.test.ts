import { describe, expect, it } from 'vitest';
import encodeShareCode from './encode';
import type { SubUnit } from '$lib/groups/SubUnit';
import decodeShareCode from './decode';

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
			title: 'LET THERE BE LIGHT',
			members: [
				['L', '1'],
				['S', 'a'],
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

		const firstCode = encodeShareCode(unit);
		const retrieved = decodeShareCode(firstCode);

		expect(unit).toStrictEqual(retrieved);
	});
});
