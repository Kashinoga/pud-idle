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

<div class="section-title">Theme</div>
<div class="nav-stack">
	<button class="ghost-button" onclick={setLightTheme}>Light</button>
	<button class="ghost-button" onclick={setDarkTheme}>Dark</button>
</div>
