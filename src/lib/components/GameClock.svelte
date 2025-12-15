<script lang="ts">
	import { gameClock } from '$lib/stores/gameClock';
	import { derived } from 'svelte/store';

	const fmtTime = derived(gameClock, ($gc) => {
		const d = new Date($gc.nowMs);
		return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
	});

	const fmtDate = derived(gameClock, ($gc) => {
		const d = new Date($gc.nowMs);
		return d.toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' });
	});

	const speed = derived(gameClock, ($gc) => $gc.speed);
	const running = derived(gameClock, ($gc) => $gc.running);

	const setSpeed = (value: number) => gameClock.setSpeed(value);
	const pause = () => gameClock.pause();
	const resume = () => gameClock.resume();
	const reset = () => gameClock.resetToNow();
</script>

<div class="card game-clock">
	<h2 class="card-title">Game Clock</h2>
	<div class="clock-display">
		<div class="date" aria-label="date">{$fmtDate}</div>
		<div class="time" aria-label="time">{$fmtTime}</div>
		<div class="status">
			<span class={$running ? 'running' : 'paused'}>{$running ? 'Running' : 'Paused'}</span>
			<span class="speed">×{$speed}</span>
		</div>
	</div>

	<div class="controls">
		<div class="speed-group" role="group" aria-label="speed">
			<button class="ghost-button" on:click={() => setSpeed(1)}>×1</button>
			<button class="ghost-button" on:click={() => setSpeed(10)}>×10</button>
			<button class="ghost-button" on:click={() => setSpeed(60)}>×60</button>
			<button class="ghost-button" on:click={() => setSpeed(360)}>×360</button>
			<button class="ghost-button" on:click={() => setSpeed(1440)}>×1440</button>
		</div>
		<div class="run-group">
			{#if $running}
				<button class="primary-button" on:click={pause}>Pause</button>
			{:else}
				<button class="primary-button" on:click={resume}>Resume</button>
			{/if}
			<button class="ghost-button" on:click={reset}>Reset to Now</button>
		</div>
	</div>
</div>

<style>
	.game-clock {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs);
	}

	.clock-display {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: var(--space-xs);
		background: var(--surface);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-liquid-glass-md);
		padding: var(--space-sm);
	}

	.date {
		color: var(--muted);
		font-size: small;
	}

	.time {
		font-size: xx-large;
		font-weight: 700;
		color: var(--foreground);
		letter-spacing: 0.02em;
	}

	.status {
		display: flex;
		gap: var(--space-xs);
		align-items: baseline;
	}

	.status .running { color: #22c55e; }
	.status .paused { color: #ef4444; }
	.status .speed {
		color: var(--primary);
		font-weight: 600;
	}

	.controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs);
	}

	.speed-group, .run-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4xs);
	}
</style>
