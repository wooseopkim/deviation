<script lang="ts">
	import { members, type AllS, type Member } from '../triples/members';
	import { getThumbnail, getVideoId } from '../triples/thumbnail';

	export let name: AllS;
	let member: Member;
	let videoId: string | undefined;
	$: {
		member = members[name];
		videoId = getVideoId(name);
	}
</script>

<figure>
	<figcaption style:background-color={member.color}><div>{name}</div></figcaption>
	<picture>
		{#if videoId !== undefined}
			<img class="profile" alt={`profile, ${name}`} src={getThumbnail(videoId, 'medium')} />
		{:else}
			<div class="profile placeholder">TBD</div>
		{/if}
	</picture>
</figure>

<style>
	figure {
		margin: 0;
		padding-inline-end: 0.6vi;
		padding-bottom: 0.6vb;
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

	@media (min-width: 1440px) {
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
