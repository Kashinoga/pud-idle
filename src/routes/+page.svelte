<script lang="ts">
	import { onMount } from 'svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import HomeView from '$lib/components/HomeView.svelte';
	import EmailView from '$lib/components/EmailView.svelte';
	import WoodcuttingView from '$lib/components/WoodcuttingView.svelte';
	import InventoryView from '$lib/components/InventoryView.svelte';
	import EquipmentView from '$lib/components/EquipmentView.svelte';
	import PlayerView from '$lib/components/PlayerView.svelte';
	import DeveloperView from '$lib/components/DeveloperView.svelte';
	import ActivityTicker from '$lib/components/ActivityTicker.svelte';
	import { inventory, selectedItemId } from '$lib/stores/inventory';
	import { equipment } from '$lib/stores/equipment';
	import { player } from '$lib/stores/player';
	import { activityLog } from '$lib/stores/activityLog';
	import { toggleTheme } from '../app';

	let isSidebarOpen = $state(false);
	let isPanelOpen = $state(false);
	let currentView = $state<
		| 'home'
		| 'email'
		| 'calendar'
		| 'settings'
		| 'woodcutting'
		| 'inventory'
		| 'equipment'
		| 'player'
		| 'developer'
	>('home');

	onMount(() => {
		// Open sidebar and panel on desktop, keep closed on mobile
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		isSidebarOpen = mediaQuery.matches;
		// isPanelOpen = mediaQuery.matches;

		// Listen for resize events
		const handleMediaChange = (e: MediaQueryListEvent) => {
			isSidebarOpen = e.matches;
			isPanelOpen = false;
		};

		mediaQuery.addEventListener('change', handleMediaChange);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	});

	const topbarNavItems = ['Overview'];
	const sidebarNavItems = ['Home', 'Email', 'Calendar'];
	const metrics = [
		{ label: 'Latency', value: '28 ms' },
		{ label: 'Uptime', value: '99.9%' },
		{ label: 'Sessions', value: '1.2k' },
		{ label: 'Conversions', value: '4.7%' }
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

	const showEquipment = () => {
		currentView = 'equipment';
	};

	const showPlayer = () => {
		currentView = 'player';
	};

	const showDeveloper = () => {
		currentView = 'developer';
	};

	const showWoodcutting = () => {
		currentView = 'woodcutting';
	};

	const showInventory = () => {
		currentView = 'inventory';
	};

	const closePanel = () => {
		isPanelOpen = false;
	};

	const closeSidebar = () => {
		isSidebarOpen = false;
	};

	const togglePanelWithItem = (itemId: string) => {
		isPanelOpen = true;
		selectedItemId.set(itemId);
	};

	const handleEquipFromPanel = () => {
		if (!selectedEquip) return;

		// Check requirements
		const canEquip = selectedEquip.requirements
			? (() => {
					// Check level requirement
					if (
						selectedEquip.requirements.minLevel &&
						selectedEquip.requirements.minLevel > $player.stats.level
					) {
						return false;
					}

					// Check inventory requirements
					if (selectedEquip.requirements.requiredItems) {
						return selectedEquip.requirements.requiredItems.every((req) => {
							const inventoryItem = $inventory.items.find((i) => i.id === req.itemId);
							return (inventoryItem?.count || 0) >= req.count;
						});
					}

					return true;
				})()
			: true;

		if (canEquip) {
			equipment.equipItem(selectedEquip.id);
			activityLog.addEvent(
				'equip',
				`Equipped ${selectedEquip.name}`,
				selectedEquip.icon,
				'var(--primary)'
			);
			closePanel();
		}
	};

	let selectedItem = $derived(
		$selectedItemId ? $inventory.items.find((item) => item.id === $selectedItemId) : null
	);

	let selectedEquip = $derived(
		$selectedItemId ? $equipment.equipment.find((e) => e.id === $selectedItemId) : null
	);
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
		<ActivityTicker />
		<div class="nav-links"></div>
		<div class="bar-actions">
			<button class="ghost-button" aria-pressed={isSidebarOpen} onclick={toggleSidebar}
				>Sidebar</button
			>
			<button class="ghost-button" aria-pressed={isPanelOpen} onclick={togglePanel}>Panel</button>
			<button onclick={toggleTheme}>Theme</button>
			<button class="ghost-button" aria-pressed={currentView === 'settings'} onclick={showSettings}
				>Settings</button
			>
		</div>
	</header>

	<aside class={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
		<div class="section-title">Navigation</div>
		<div class="nav-stack">
			<button
				class={`nav-item nav-home ${currentView === 'home' ? 'is-active' : ''}`}
				onclick={showHome}>Home</button
			>
			<button
				class={`nav-item nav-email ${currentView === 'email' ? 'is-active' : ''}`}
				onclick={showEmail}>Email</button
			>
			<button
				class={`nav-item nav-calendar ${currentView === 'calendar' ? 'is-active' : ''}`}
				onclick={showCalendar}>Calendar</button
			>
			<button
				class={`nav-item nav-woodcutting ${currentView === 'woodcutting' ? 'is-active' : ''}`}
				onclick={showWoodcutting}>Woodcutting</button
			>
			<button
				class={`nav-item nav-inventory ${currentView === 'inventory' ? 'is-active' : ''}`}
				onclick={showInventory}>Inventory</button
			>
			<button
				class={`nav-item nav-equipment ${currentView === 'equipment' ? 'is-active' : ''}`}
				onclick={showEquipment}>Equipment</button
			>
			<button
				class={`nav-item nav-player ${currentView === 'player' ? 'is-active' : ''}`}
				onclick={showPlayer}>Character</button
			>
			<button
				class={`nav-item nav-developer ${currentView === 'developer' ? 'is-active' : ''}`}
				onclick={showDeveloper}>Developer</button
			>
		</div>
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
			<HomeView />
		{:else if currentView === 'email'}
			<EmailView />
		{:else if currentView === 'calendar'}
			<div class="content-header">
				<h1>Calendar</h1>
				<p>Calendar view coming soon...</p>
			</div>
		{:else if currentView === 'woodcutting'}
			<WoodcuttingView {togglePanelWithItem} />
		{:else if currentView === 'inventory'}
			<InventoryView {togglePanelWithItem} />
		{:else if currentView === 'equipment'}
			<EquipmentView {togglePanelWithItem} />
		{:else if currentView === 'player'}
			<PlayerView />
		{:else if currentView === 'developer'}
			<DeveloperView />
		{:else if currentView === 'settings'}
			<div class="content-header">
				<h1>Settings</h1>
			</div>
			<ThemeToggle />
		{/if}
	</main>

	<!-- Backdrop for closing sidebar on mobile -->
	{#if isSidebarOpen}
		<div
			class="sidebar-backdrop"
			onclick={closeSidebar}
			onkeydown={(e) => e.key === 'Enter' && closeSidebar()}
			role="button"
			tabindex="-1"
		></div>
	{/if}

	<!-- Backdrop for closing panel when clicking outside -->
	{#if isPanelOpen}
		<div
			class="panel-backdrop"
			onclick={closePanel}
			onkeydown={(e) => e.key === 'Enter' && closePanel()}
			role="button"
			tabindex="-1"
		></div>
	{/if}

	<aside class={`overlay-panel ${isPanelOpen ? 'is-open' : ''}`}>
		<div class="panel-header">
			<button class="ghost-button" onclick={closePanel} title="Close panel">
				<span class="close-icon">Close</span>
			</button>
			<span>{selectedItem ? 'Item Details' : 'Details'}</span>
		</div>
		<div class="panel-body">
			{#if selectedItem}
				<div class="item-detail-section">
					<div class="item-detail-icon">{selectedItem.icon}</div>
					<div class="item-detail-name">{selectedItem.name}</div>
					<div class="item-detail-count">
						<span class="label">Total Count:</span>
						<span class="value">{selectedItem.count}</span>
					</div>
				</div>

				{#if selectedItem.description}
					<div class="section-block">
						<h3>Description</h3>
						<p>{selectedItem.description}</p>
					</div>
				{/if}

				{#if selectedItem.lore}
					<div class="section-block">
						<h3>Lore</h3>
						<p>{selectedItem.lore}</p>
					</div>
				{/if}
			{:else if selectedEquip}
				<div class="item-detail-section">
					<div class="item-detail-icon">{selectedEquip.icon}</div>
					<div class="item-detail-name">{selectedEquip.name}</div>
					<div class="item-detail-count">
						<span class="label">Type:</span>
						<span class="value">{selectedEquip.type}</span>
					</div>
				</div>

				<div class="section-block">
					<h3>Stats</h3>
					<div class="metric-row">
						{#if selectedEquip.stats.speedBonus > 0}
							<div class="metric">
								<div class="label">Speed Boost</div>
								<div class="title">+{Math.round(selectedEquip.stats.speedBonus * 100)}%</div>
							</div>
						{/if}
						{#if selectedEquip.stats.gatherAmount > 1}
							<div class="metric">
								<div class="label">Per Gather</div>
								<div class="title">×{selectedEquip.stats.gatherAmount}</div>
							</div>
						{/if}
					</div>
					{#if selectedEquip.stats.specialAbilities.length > 0}
						<div class="chip-row" style="margin-top:0.5rem">
							{#each selectedEquip.stats.specialAbilities as ability}
								<span class="chip">{ability}</span>
							{/each}
						</div>
					{/if}
				</div>

				{#if selectedEquip.requirements}
					<div class="section-block">
						<h3>Requirements</h3>
						<div class="metric-row">
							{#if selectedEquip.requirements.minLevel}
								<div class="metric">
									<div class="label">Min Level</div>
									<div class="title">{selectedEquip.requirements.minLevel}</div>
								</div>
							{/if}
						</div>
						{#if selectedEquip.requirements.requiredItems}
							<div class="chip-row" style="margin-top:0.5rem">
								{#each selectedEquip.requirements.requiredItems as req}
									<span class="chip">
										{req.count} × {$inventory.items.find((i) => i.id === req.itemId)?.name ||
											req.itemId}
									</span>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<div class="section-block">
					<h3>Actions</h3>
					<button class="primary-button" onclick={handleEquipFromPanel} style="width: 100%;">
						Equip
					</button>
				</div>
			{:else}
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet massa eget
						velit congue dapibus. Cras at lectus sed neque aliquet dictum non vitae sem.
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
			{/if}
		</div>
	</aside>
</div>
