import type { SubUnit } from '$lib/groups/SubUnit';
import { writable } from 'svelte/store';

const palette = writable<SubUnit>({
	title: '',
	members: [],
});

export default palette;
