function memoize<T, R>(f: (x: T) => R): typeof f {
	const cache = new Map<T, R>();
	return (x: T) => {
		const key = x;
		if (cache.has(key)) {
			return cache.get(key) as R;
		}
		const value = f(x);
		cache.set(key, value);
		return value;
	};
}

export default function memoized<T1, T2, R>(): (x: T1, y: T2) => R;
export default function memoized<T, R>() {
	return (original: (...args: T[]) => R, _ctx: ClassMethodDecoratorContext) => memoize(original);
}
