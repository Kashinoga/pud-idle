<script lang="ts">
	import { onMount } from 'svelte';
	import { initTheme, setTheme } from '../../app';
	import type { Theme } from '../../app';

	let activeTheme = $state<Theme>('light');

	onMount(() => {
		activeTheme = initTheme();
	});

	const setLightTheme = () => {
		activeTheme = setTheme('light');
	};

	const setDarkTheme = () => {
		activeTheme = setTheme('dark');
	};
</script>

<div class="theme-toggle" role="group" aria-label="Theme">
	<button
		class={`toggle-chip ${activeTheme === 'light' ? 'is-active' : ''}`}
		onclick={setLightTheme}
		aria-pressed={activeTheme === 'light'}
	>
		<span class="dot" aria-hidden="true"> </span>
		<span>Light</span>
	</button>
	<button
		class={`toggle-chip ${activeTheme === 'dark' ? 'is-active' : ''}`}
		onclick={setDarkTheme}
		aria-pressed={activeTheme === 'dark'}
	>
		<span class="dot" aria-hidden="true"> </span>
		<span>Dark</span>
	</button>
</div>

<style>
	.theme-toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-4xs);
		border: 1px solid var(--surface-border);
		border-radius: 999px;
		padding: var(--space-2xs) var(--space-xs);
		background: var(--surface);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
	}

	.toggle-chip {
		display: inline-flex;
		align-items: center;
		gap: var(--space-4xs);
		padding: var(--space-2xs) var(--space-sm);
		border: 1px solid transparent;
		border-radius: 999px;
		background: transparent;
		color: var(--muted-foreground);
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 180ms ease;
	}

	.toggle-chip .dot {
		width: 8px;
		height: 8px;
		border-radius: 999px;
		background: var(--surface-border);
		transition: background 180ms ease;
	}

	.toggle-chip.is-active {
		color: var(--foreground);
		background: linear-gradient(135deg, #22c55e, #10b981);
		color: #0b1b13;
		border-color: color-mix(in srgb, #22c55e 60%, var(--surface-border));
		box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
	}

	.toggle-chip.is-active .dot {
		background: #0b1b13;
	}

	.toggle-chip:focus-visible {
		outline: 2px solid var(--primary);
		outline-offset: 2px;
	}

	@media (max-width: 640px) {
		.theme-toggle {
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
