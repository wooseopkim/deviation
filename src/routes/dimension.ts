import { writable } from 'svelte/store';
import type { AllS } from '../triples/members';

export default writable({
	title: '',
	members: [] as AllS[],
});
