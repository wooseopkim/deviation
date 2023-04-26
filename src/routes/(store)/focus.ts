import type { MemberPath } from '$lib/groups/MemberPath';
import { writable } from 'svelte/store';

const focus = writable<MemberPath | undefined>();

export default focus;
