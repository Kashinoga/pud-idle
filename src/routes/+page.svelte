<script lang="ts">
	import { onMount } from 'svelte';
	import { initTheme, setTheme, toggleTheme } from '../app';
	import type { Theme } from '../app';

	let isSidebarOpen = $state(true);
	let isPanelOpen = $state(true);
	let activeTheme = $state<Theme>('light');

	const navItems = ['Overview', 'Analytics', 'Billing', 'Team', 'Settings'];
	const cards = [
		{
			title: 'Glassmorphic surfaces',
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus in dui eu interdum.'
		},
		{
			title: 'Layered depth',
			body: 'Aliquam erat volutpat. Integer scelerisque aliquet purus, id gravida mi iaculis in.'
		},
		{
			title: 'Independent scrolling',
			body: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.'
		},
		{
			title: 'Fluid navigation',
			body: 'Maecenas a magna ac lorem dictum tempor. Integer euismod, nisl ut gravida posuere.'
		}
	];

	const paragraphs = [
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra, sem ut hendrerit aliquet, urna magna volutpat sapien, sed cursus lorem nibh sit amet eros.',
		'Praesent in justo ut nisi gravida auctor. Nullam rhoncus libero id ante molestie, vitae consectetur massa sodales. Donec tincidunt, lacus nec blandit finibus.',
		'Fusce imperdiet sem at risus rhoncus, nec ultricies est interdum. In porttitor libero ac lacus malesuada, at dapibus enim rhoncus. Aliquam erat volutpat.',
		'Quisque feugiat, tortor a tempus bibendum, nibh orci tempus turpis, vitae rhoncus neque ipsum ac purus. Vivamus fermentum urna vel lacus consectetur, sit amet dapibus urna fermentum.',
		'Sed euismod augue quis enim vehicula, non vehicula mi luctus. Suspendisse potenti. Mauris efficitur nisi sit amet justo facilisis, vel fermentum nunc tincidunt.',
		'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam vel massa vitae velit consequat congue. Nulla facilisi.',
		'Ut ac purus vel nunc feugiat venenatis. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur aliquet quam id dui posuere blandit.',
		'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed.',
		'Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.',
		'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vivamus suscipit tortor eget felis porttitor volutpat. Cras ultricies ligula sed magna dictum porta.',
		'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.',
		'Donec rutrum congue leo eget malesuada. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur arcu erat, accumsan id imperdiet et.'
	];

	const metrics = [
		{ label: 'Latency', value: '28 ms' },
		{ label: 'Uptime', value: '99.9%' },
		{ label: 'Sessions', value: '1.2k' },
		{ label: 'Conversions', value: '4.7%' }
	];

	onMount(() => {
		activeTheme = initTheme();
	});

	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
	};

	const togglePanel = () => {
		isPanelOpen = !isPanelOpen;
	};

	const handleToggleTheme = () => {
		activeTheme = toggleTheme();
	};

	const setLightTheme = () => {
		activeTheme = setTheme('light');
	};

	const setDarkTheme = () => {
		activeTheme = setTheme('dark');
	};
</script>

<svelte:head>
	<title>Liquid Glass Layout</title>
</svelte:head>

<div class={`app-shell ${isSidebarOpen ? 'sidebar-open' : ''} ${isPanelOpen ? 'panel-open' : ''}`}>
	<div class="ambient-glow"></div>

	<header class="mobile-top-bar">
		<div class="brand">Intergalactic Park Ranger</div>
	</header>

	<header class="top-bar">
		<div class="brand">Intergalactic Park Ranger</div>
		<div class="nav-links">
			{#each navItems as item}
				<span class="pill">{item}</span>
			{/each}
		</div>
		<div class="bar-actions">
			<button class="ghost-button" aria-pressed={isSidebarOpen} onclick={toggleSidebar}
				>Sidebar</button
			>
			<button class="ghost-button" aria-pressed={isPanelOpen} onclick={togglePanel}>Panel</button>
			<button class="ghost-button" onclick={handleToggleTheme}>Theme</button>
		</div>
	</header>

	<aside class={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
		<div class="section-title">Navigation</div>
		<div class="nav-stack">
			{#each navItems as item}
				<div class="nav-item">{item}</div>
			{/each}
		</div>
		<div class="section-title">Theme</div>
		<div class="nav-stack">
			<button class="ghost-button" onclick={setLightTheme}>Light</button>
			<button class="ghost-button" onclick={setDarkTheme}>Dark</button>
		</div>
		<div class="section-title">Additional Items</div>
		<div class="nav-stack">
			{#each Array(15)
				.fill(0)
				.map((_, i) => `Item ${i + 1}`) as item}
				<div class="nav-item">{item}</div>
			{/each}
		</div>
		<div style="padding: 1rem;">
			<p style="color: var(--muted); font-size: 0.9rem; line-height: 1.5;">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris.
			</p>
			<p style="color: var(--muted); font-size: 0.9rem; line-height: 1.5; margin-top: 0.5rem;">
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</p>
		</div>
	</aside>

	<main class="content-area">
		<div class="content-header">
			<h1>Three-Column Glass Layout</h1>
			<p>
				Mobile-first, glassy scaffold with a fixed bar, collapsible sidebar, and overlay panel.
				Scroll each area independently and keep controls in view.
			</p>
		</div>

		<div class="card-grid">
			{#each cards as card}
				<article class="glass-card">
					<div class="label">Surface</div>
					<div class="title">{card.title}</div>
					<p>{card.body}</p>
				</article>
			{/each}
		</div>

		<div class="section-block" style="margin-top: 1rem; display: grid; gap: 0.75rem;">
			<h3>Scrollable content</h3>
			{#each paragraphs as copy}
				<p>{copy}</p>
			{/each}
		</div>

		<div class="section-block" style="margin-top: 1rem; display: grid; gap: 0.75rem;">
			<h3>More content sections</h3>
			{#each paragraphs.slice(0, 4) as copy}
				<p>{copy}</p>
			{/each}
		</div>

		<div class="card-grid" style="margin-top: 1rem;">
			{#each cards as card}
				<article class="glass-card">
					<div class="label">Additional</div>
					<div class="title">{card.title}</div>
					<p>{card.body}</p>
				</article>
			{/each}
		</div>

		<div class="section-block" style="margin-top: 1rem; display: grid; gap: 0.75rem;">
			<h3>Even more scrollable content</h3>
			{#each paragraphs.slice(4, 8) as copy}
				<p>{copy}</p>
			{/each}
		</div>
	</main>

	<aside class={`overlay-panel ${isPanelOpen ? 'is-open' : ''}`}>
		<div class="panel-header">Overlay panel</div>
		<div class="panel-body">
			<div class="metric-row">
				{#each metrics as metric}
					<div class="metric">
						<div class="label">{metric.label}</div>
						<div class="title">{metric.value}</div>
					</div>
				{/each}
			</div>
			<div class="chip-row">
				<span class="chip">Glassmorphism</span>
				<span class="chip">Responsive</span>
				<span class="chip">Svelte 5 Runes</span>
				<span class="chip">TypeScript</span>
			</div>
			<div class="section-block">
				<h3>Panel notes</h3>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet massa eget velit
					congue dapibus. Cras at lectus sed neque aliquet dictum non vitae sem.
				</p>
			</div>
			<div class="section-block">
				<h3>Extended information</h3>
				{#each paragraphs.slice(0, 6) as para}
					<p style="margin-top: 0.5rem;">{para}</p>
				{/each}
			</div>
			<div class="metric-row">
				{#each metrics as metric}
					<div class="metric">
						<div class="label">{metric.label}</div>
						<div class="title">{metric.value}</div>
					</div>
				{/each}
			</div>
			<div class="section-block">
				<h3>Additional panel content</h3>
				{#each paragraphs.slice(6, 10) as para}
					<p style="margin-top: 0.5rem;">{para}</p>
				{/each}
			</div>
		</div>
	</aside>
</div>
