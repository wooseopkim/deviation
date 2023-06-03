import { writable } from 'svelte/store';
import type { MemberPath } from '$lib/groups/MemberPath';

const focus = writable<MemberPath | undefined>();

export default focus;
