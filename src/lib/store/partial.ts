import { type Writable, derived } from 'svelte/store';

type KeySpec<T> = keyof T;
type ObjectSpec<T, P> = {
	read: (x: T) => P;
	update: (x: T, value: P) => T;
};
type Spec<T, P> = KeySpec<T> | ObjectSpec<T, P>;

function createPartial<T, K extends KeySpec<T>>(
	original: Writable<T>,
	key: K
): Writable<T[K]>;
function createPartial<T, P>(original: Writable<T>, spec: ObjectSpec<T, P>): Writable<P>;
function createPartial<T, P>(original: Writable<T>, spec: Spec<T, P>): Writable<P> {
	const { read, update: write } = parseSpec<T, P>(spec);

	const partial = derived(original, read);

	const set: Writable<P>['set'] = (partialValue) => {
		original.update((x) => write(x, partialValue));
	};

	const update: Writable<P>['update'] = (partialUpdate) => {
		original.update((x) => write(x, partialUpdate(read(x))));
	};

	return {
		...partial,
		set,
		update,
	};
}

function parseSpec<T, P>(spec: Readonly<Spec<T, P>>): ObjectSpec<T, P> {
	if (typeof spec === 'object') {
		return spec;
	}

	return {
		read: (x: T) => x[spec],
		update: (x: T, value: P) => ({
			...x,
			[spec]: value,
		}),
	} as ObjectSpec<T, P>;
}

export default createPartial;
