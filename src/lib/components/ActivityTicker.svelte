<script lang="ts">
	import { activityLog } from '$lib/stores/activityLog';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';

	// Track the last ten events - reverse order so oldest is left, newest (current) is right
	let events = $derived($activityLog.events.slice(0, 10).reverse());
	let trackEl: HTMLDivElement | null = null;

	// Auto-scroll to the newest event when the list changes
	$effect(() => {
		events;
		queueMicrotask(() => {
			if (trackEl) {
				trackEl.scrollTo({ left: trackEl.scrollWidth, behavior: 'smooth' });
			}
		});
	});
</script>

<div class="activity-ticker">
	<div class="ticker-label">
		<span class="ticker-icon">📡</span>
		<span class="ticker-text">Activity</span>
	</div>
	<div class="ticker-track" bind:this={trackEl}>
		{#each events as event, i (event.id)}
			{@const isPrev2 = i === 0 && events.length >= 3}
			{@const isPrev1 = i === (events.length === 3 ? 1 : 0) && events.length >= 2}
			{@const isCurrent = i === events.length - 1}
			<div
				class="ticker-event"
				class:peek-old2={isPrev2}
				class:peek-old1={isPrev1}
				class:current={isCurrent}
				in:fly={{ x: 200, duration: 500, easing: quintOut }}
				out:fly={{ x: -200, duration: 400, easing: quintOut }}
				animate:flip={{ duration: 400, easing: quintOut }}
				style:--event-color={event.color || 'var(--primary)'}
			>
				<span class="event-icon">{event.icon}</span>
				<span class="event-message">{event.message}</span>
			</div>
		{/each}
		{#if events.length === 0}
			<div class="ticker-empty">
				<span>Awaiting activity...</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.activity-ticker {
		display: flex;
		align-items: center;
		gap: var(--space-4xs);
		flex: 1;
		min-width: 0;
		height: 38px;
		/* overflow: hidden; */
		padding: var(--space-4xs);
		background: linear-gradient(120deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		backdrop-filter: blur(8px);
		box-shadow: var(--shadow-sharp);
	}

	.ticker-label {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		flex-shrink: 0;
        /* padding-left: var(--space-4xs); */
		/* padding-right: var(--space-4xs); */
		/* border-right: 1px solid var(--surface-border); */
		height: 100%;
	}

	.ticker-icon {
		font-size: 1rem;
		line-height: 1;
	}

	.ticker-text {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
	}

	.ticker-track {
		display: flex;
		align-items: center;
		gap: var(--space-4xs);
		flex: 1;
		min-width: 0;
		position: relative;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: thin;
        /* margin-right: var(--space-4xs); */
        border-radius: var(--radius-sm);
	}

	.ticker-event {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.25rem 0.65rem;
		background: var(--event-color);
		backdrop-filter: blur(var(--blur));
		/* border: 1px solid var(--surface-border); */
		border-radius: var(--radius-sm);
		font-size: 0.8rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex-shrink: 0;
		/* max-width: 45%; */
		transition: all 300ms ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		height: 28px;
	}

	.ticker-event.current {
		/* background: linear-gradient(90deg, var(--event-color) 0%, transparent 100%); */
		opacity: 1;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
	}

	.ticker-event.peek-old1 {
		/* background: var(--event-color) 100%; */
		/* opacity: 0.5; */
		/* max-width: 32%; */
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}

	.ticker-event.peek-old2 {
		/* opacity: 0.25; */
		/* max-width: 25%;   */
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
	}

	.event-icon {
		font-size: 0.9rem;
		line-height: 1;
		flex-shrink: 0;
	}

	.event-message {
		overflow: hidden;
		text-overflow: ellipsis;
		font-weight: 500;
		color: var(--foreground);
	}

	.ticker-empty {
		/* padding: 0 var(--space-xs); */
		font-size: 0.75rem;
		color: var(--muted);
		font-style: italic;
	}

	@media (max-width: 767px) {
		.activity-ticker {
			display: none;
		}
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.ticker-text {
			display: none;
		}

		.ticker-label {
			/* padding-right: var(--space-2xs); */
		}
	}
</style>
