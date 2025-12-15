<script lang="ts">
	import { gameClock } from '$lib/stores/gameClock';
	import { derived } from 'svelte/store';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	// Separate date and time so date stays in place and
	// time digits can be laid out per-character.
	const displayDate = derived(gameClock, ($gc) => {
		const d = new Date($gc.nowMs);
		const month = d.toLocaleString([], { month: 'short' });
		const day = d.toLocaleString([], { day: '2-digit' });
		return `${month} ${day}, 2172`;
	});

	// 24-hour HH:MM for consistent digit layout
	const displayTimeDigits = derived(gameClock, ($gc) => {
		const d = new Date($gc.nowMs);
		const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
		return time.split('');
	});

	const handleClick = () => dispatch('openCalendar');
</script>

<button class="ghost-button clock-button" aria-label="Game clock" on:click={handleClick}>
	<span class="clock-content">
		<span class="date">{$displayDate}</span>
		<span class="clock-time">
			<span class="time-grid">
				{#each $displayTimeDigits as char}
					<span class={`digit ${char === ':' ? 'colon' : 'num'}`}>{char}</span>
				{/each}
			</span>
		</span>
	</span>
</button>

<style>
	.clock-button {
		color: var(--foreground);
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		justify-content: flex-start;
		/* Make digits equal-width so changes don't shift layout */
		font-variant-numeric: tabular-nums lining-nums;
		font-feature-settings:
			'tnum' 1,
			'lnum' 1;
	}

	.clock-content {
		display: flex;
		gap: var(--space-4xs);
		align-items: center;
	}

	.clock-time {
		border-left: 1px solid var(--surface-border);
        padding-left: var(--space-4xs);
	}

	.time-grid {
		display: grid;
		grid-auto-flow: column;
		/* column-gap: 0.35ch; */
		align-items: center;
	}

	.digit {
		/* display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.4ch;
		padding: 0.05rem 0.1rem;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--surface-border);
		box-shadow: var(--shadow-liquid-glass-sm); */
	}

	.digit.colon {
		/* min-width: 0.8ch; */
		/* padding-left: 0.2ch; */
		/* padding-right: 0.2ch; */
		/* background: transparent; */
		/* border: none; */
		/* box-shadow: none; */
		/* opacity: 0.8; */
	}

	/* No paused alt-display for now */
</style>
