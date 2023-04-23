import { writable } from 'svelte/store';
import type { MemberPath } from '$lib/groups/MemberPath';
import type { SubUnit } from '$lib/groups/SubUnit';

export default writable<SubUnit>({
	title: '',
	members: [] as MemberPath[],
});
