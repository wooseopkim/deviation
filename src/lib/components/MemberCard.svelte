<script lang="ts">
	import { getMember } from '$lib/groups';
	import type { Member } from '$lib/groups/Member';
	import type { MemberPath } from '$lib/groups/MemberPath';
	import { getThumbnail } from '$lib/thumbnail';

	export let id: MemberPath;
	let member: Member;
	$: member = getMember(id);
</script>

<figure>
	<figcaption style:background-color={member.color ?? 'grey'}>
		<div>{member.name}</div>
	</figcaption>
	<picture>
		{#if member.videoId !== undefined}
			<img
				class="profile"
				alt={`profile, ${member.name}`}
				src={getThumbnail(member.videoId, 'medium')}
				referrerpolicy="no-referrer"
			/>
		{:else}
			<div class="profile placeholder">TBD</div>
		{/if}
	</picture>
</figure>

<style>
	figure {
		margin: 0;
		padding-inline-end: 0.6vi;
		padding-bottom: 0.2vi;
		cursor: pointer;
	}

	figcaption {
		font-weight: bold;
		color: white;
		max-width: var(--card-width);
	}

	@media (min-width: 768px) {
		figcaption {
			font-size: 1.2em;
		}
	}

	@media (min-width: 1680px) {
		figcaption {
			font-size: 1.4em;
		}
	}

	figcaption div {
		padding-inline-start: 0.3em;
		background-color: rgba(0, 0, 0, 0.3);
	}

	img {
		object-fit: cover;
	}

	.profile {
		width: var(--card-width);
		height: calc(var(--card-width) * 9 / 21);
	}

	.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: black;
		color: white;
		user-select: none;
	}
</style>
