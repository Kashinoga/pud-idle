<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import EmailView from '$lib/components/EmailView.svelte';

	let isSidebarOpen = $state(false);
	let isPanelOpen = $state(false);
	let currentView = $state<'home' | 'email' | 'calendar' | 'settings'>('home');

	onMount(() => {
		// Open sidebar and panel on desktop, keep closed on mobile
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		isSidebarOpen = mediaQuery.matches;
		isPanelOpen = mediaQuery.matches;

		// Listen for resize events
		const handleMediaChange = (e: MediaQueryListEvent) => {
			isSidebarOpen = e.matches;
			isPanelOpen = e.matches;
		};

		mediaQuery.addEventListener('change', handleMediaChange);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	});

	const topbarNavItems = ['Overview'];
	const sidebarNavItems = ['Home', 'Email', 'Calendar'];
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

	const toggleSidebar = () => {
		isSidebarOpen = !isSidebarOpen;
	};

	const togglePanel = () => {
		isPanelOpen = !isPanelOpen;
	};

	const showSettings = () => {
		currentView = 'settings';
	};

	const showHome = () => {
		currentView = 'home';
	};

	const showEmail = () => {
		currentView = 'email';
	};

	const showCalendar = () => {
		currentView = 'calendar';
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
		</div>
		<div class="bar-actions">
			<button class="ghost-button" aria-pressed={isSidebarOpen} onclick={toggleSidebar}
				>Sidebar</button
			>
			<button class="ghost-button" aria-pressed={isPanelOpen} onclick={togglePanel}>Panel</button>
			<button class="ghost-button" aria-pressed={currentView === 'settings'} onclick={showSettings}>Settings</button>
		</div>
	</header>

	<aside class={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
		<div class="section-title">Navigation</div>
		<div class="nav-stack">
			<button class="nav-item" onclick={showHome}>Home</button>
			<button class="nav-item" onclick={showEmail}>Email</button>
			<button class="nav-item" onclick={showCalendar}>Calendar</button>
		</div>
		<ThemeToggle />
		<div class="section-title">Quick Access</div>
		<div class="section-sub-title">Pin frequently used items for easy access</div>
		<div class="nav-stack">
			{#each Array(15)
				.fill(0)
				.map((_, i) => `Item ${i + 1}`) as item}
				<div class="nav-item">{item}</div>
			{/each}
		</div>
		<div class="sidebar-footer">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris.
			</p>
			<p>
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
				pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
				mollit anim id est laborum.
			</p>
		</div>
	</aside>

	<main class="view-content-max-height content-area">
		{#if currentView === 'home'}
			<div class="content-header">
				<h1>Overview</h1>
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

			<div class="section-block section-block-spaced">
				<h3>Scrollable content</h3>
				{#each paragraphs as copy}
					<p>{copy}</p>
				{/each}
			</div>

			<div class="section-block section-block-spaced">
				<h3>More content sections</h3>
				{#each paragraphs.slice(0, 4) as copy}
					<p>{copy}</p>
				{/each}
			</div>

			<div class="card-grid card-grid-spaced">
				{#each cards as card}
					<article class="glass-card">
						<div class="label">Additional</div>
						<div class="title">{card.title}</div>
						<p>{card.body}</p>
					</article>
				{/each}
			</div>

			<div class="section-block section-block-spaced">
				<h3>Even more scrollable content</h3>
				{#each paragraphs.slice(4, 8) as copy}
					<p>{copy}</p>
				{/each}
			</div>
		{:else if currentView === 'email'}
			<EmailView />
		{:else if currentView === 'calendar'}
			<div class="content-header">
				<h1>Calendar</h1>
				<p>Calendar view coming soon...</p>
			</div>
		{:else if currentView === 'settings'}
			<div class="content-header">
				<h1>Settings</h1>
			</div>
			<ThemeToggle />
		{/if}
	</main>

	<aside class={`overlay-panel ${isPanelOpen ? 'is-open' : ''}`}>
		<div class="panel-header">Details</div>
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
					<p class="panel-paragraph">{para}</p>
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
					<p class="panel-paragraph">{para}</p>
				{/each}
			</div>
		</div>
	</aside>
</div>
