<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import type { SubUnit } from "$lib/groups/SubUnit";
	import type { Writable } from "svelte/store";

  export let of: Writable<SubUnit>;

  function onClick() {
    of.update((value) => ({
      ...value,
      title: '',
    }));
  }
</script>

<Button enabled={$of.title.length > 0} on:click={onClick}>
  Clear title
</Button>
