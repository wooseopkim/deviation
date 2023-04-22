import { writable } from 'svelte/store';
import type { AllS } from '../triples/members';

export const title = writable('');
export const members = writable([] as AllS[]);
