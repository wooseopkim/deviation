import { writable } from 'svelte/store';

const folded = writable(new Set<number>());

export default folded;
