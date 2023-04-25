import { writable } from 'svelte/store';
import type { SubUnit } from '$lib/groups/SubUnit';

export default writable<SubUnit>({
	title: '',
	members: [],
});
