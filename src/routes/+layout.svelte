<script lang="ts">
	import lightIcon from '$lib/assets/favicon-light.svg';
	import darkIcon from '$lib/assets/favicon-dark.svg';
	import '../app.css';
	import '../app.ts';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={lightIcon} type="image/svg+xml" media="(prefers-color-scheme: light)" />
	<link rel="icon" href={darkIcon} type="image/svg+xml" media="(prefers-color-scheme: dark)" />
	<link rel="icon" href={lightIcon} type="image/svg+xml" />
</svelte:head>

{@render children()}
