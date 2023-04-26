<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import decodeShareCode from '$lib/share-code/decode';
	import type { Writable } from 'svelte/store';

	export let into: Writable<SubUnit>;

	function onClick() {
		const code = prompt('Share code:') ?? '';
		if (code.length === 0) {
			return;
		}
		try {
			const unit = decodeShareCode(code);
			into.set(unit);
		} catch {
			alert(`Invalid code: ${code}`);
		}
	}
</script>

<Button on:click={onClick}>Load share code</Button>
