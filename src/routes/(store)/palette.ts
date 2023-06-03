import { writable } from 'svelte/store';
import type { SubUnit } from '$lib/groups/SubUnit';

const palette = writable<SubUnit>({
	title: '',
	members: [],
});

export default palette;
