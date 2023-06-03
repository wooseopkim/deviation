<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import LoadingButton, { type SetTask } from '$lib/components/LoadingButton.svelte';
	import type { SubUnit } from '$lib/groups/SubUnit';
	import encodeShareCode from '$lib/share-code/encode';

	type $$Props = ComponentProps<LoadingButton> & {
		of: typeof of;
	};

	export let of: SubUnit;

	function onClick(setTask: SetTask, unit: SubUnit) {
		const code = encodeShareCode(unit);
		window.navigator.clipboard.writeText(code);
		const wait = new Promise<void>((resolve) => setTimeout(resolve, 1000));
		setTask(wait, `Copied ${code}`);
	}
</script>

<LoadingButton enabled={of.members.length > 0} on:click={(e) => onClick(e.detail, of)}>
	Copy share code
</LoadingButton>
