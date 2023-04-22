import { writable } from 'svelte/store';
import type { AllS } from '../triples/members';

const focus = writable<AllS | undefined>();

export default focus;
