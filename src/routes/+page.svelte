<script lang="ts">
	// Svelte imports
	import { onMount } from 'svelte';

	// App imports
	import { getActiveTheme, toggleTheme } from '../app';

	// Component imports
	import ActivityTicker from '$lib/components/ActivityTicker.svelte';

	// Store imports
	import { activityLog, type ActivityEvent } from '$lib/stores/activityLog';
	import { equipment } from '$lib/stores/equipment';
	import { inventory, selectedItemId } from '$lib/stores/inventory';
	import { starship } from '$lib/stores/starship';
	import { player } from '$lib/stores/player';

	// View imports
	import DeveloperView from '$lib/components/DeveloperView.svelte';
	import EmailView from '$lib/components/EmailView.svelte';
	import EquipmentView from '$lib/components/EquipmentView.svelte';
	import HomeView from '$lib/components/HomeView.svelte';
	import IntroductionView from '$lib/components/IntroductionView.svelte';
	import InventoryView from '$lib/components/InventoryView.svelte';
	import PlayerView from '$lib/components/PlayerView.svelte';
	import SettingsView from '$lib/components/SettingsView.svelte';
	import StarshipView from '$lib/components/StarshipView.svelte';
	import WoodcuttingView from '$lib/components/WoodcuttingView.svelte';
	import TopBarClock from '$lib/components/TopBarClock.svelte';
	import CalendarView from '$lib/components/CalendarView.svelte';
	import ShelteringView from '$lib/components/ShelteringView.svelte';

	let isSidebarOpen = $state(false);
	let isPanelOpen = $state(false);
	let activeTheme = $state<'light' | 'dark'>('light');
	let currentView = $state<
		| 'introduction'
		| 'starship'
		| 'home'
		| 'email'
		| 'calendar'
		| 'settings'
		| 'woodcutting'
		| 'inventory'
		| 'equipment'
		| 'player'
		| 'developer'
		| 'sheltering'
	>('home');

	let isMobile = $state(false);

	onMount(() => {
		// Open sidebar and panel on desktop, keep closed on mobile
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		isMobile = mediaQuery.matches;
		isSidebarOpen = mediaQuery.matches;
		activeTheme = getActiveTheme();
		// isPanelOpen = mediaQuery.matches;

		// Listen for resize events
		const handleMediaChange = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
			isSidebarOpen = e.matches;
			isPanelOpen = false;
		};

		mediaQuery.addEventListener('change', handleMediaChange);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	});

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
		if (isPanelOpen) {
			closePanel();
		}
	};

	const togglePanel = () => {
		isPanelOpen = !isPanelOpen;
		if (isSidebarOpen) {
			closeSidebar();
		}
	};

	const handleToggleTheme = () => {
		activeTheme = toggleTheme();
	};

	const navigateTo = (view: typeof currentView) => {
		currentView = view;
		if (isSidebarOpen) {
			closeSidebar();
		}
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

	const handleActivitySelect = (event: ActivityEvent) => {
		if (event.panelItemId) {
			// Toggle panel if clicking on the same event that's already open
			if (isPanelOpen && $selectedItemId === event.panelItemId) {
				closePanel();
			} else {
				togglePanelWithItem(event.panelItemId);
			}
		}
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
				'var(--primary)',
				selectedEquip.id
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
	<title>Intergalactic Park Ranger</title>
</svelte:head>

<div class={`app-shell ${isSidebarOpen ? 'sidebar-open' : ''} ${isPanelOpen ? 'panel-open' : ''}`}>
	<div class="ambient-glow"></div>

	<header class="mobile-top-bar">
		<button
			id="brand-button"
			class="button brand"
			onclick={() => navigateTo('introduction')}
			aria-label="Brand"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="var(--foreground)"
				viewBox="0 0 256 256"
				><path
					d="M101.85,191.14C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Zm122-144a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.4,27.07h0L88,108.7A8,8,0,0,1,76.67,97.39l26.56-26.57A4,4,0,0,0,100.41,64H74.35A15.9,15.9,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A16,16,0,0,0,192,181.65V155.59a4,4,0,0,0-6.83-2.82l-26.57,26.56a8,8,0,0,1-11.71-.42,8.2,8.2,0,0,1,.6-11.1l49.27-49.27h0C223.45,91.86,224.6,59.71,223.85,47.12Z"
				></path></svg
			></button
		>

		<ActivityTicker onActivitySelect={handleActivitySelect} />
	</header>

	<header class="top-bar">
		<button class="button brand" onclick={() => navigateTo('introduction')} aria-label="Brand"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="var(--foreground)"
				viewBox="0 0 256 256"
				><path
					d="M223.85,47.12a16,16,0,0,0-15-15c-12.58-.75-44.73.4-71.41,27.07L132.69,64H74.36A15.91,15.91,0,0,0,63,68.68L28.7,103a16,16,0,0,0,9.07,27.16l38.47,5.37,44.21,44.21,5.37,38.49a15.94,15.94,0,0,0,10.78,12.92,16.11,16.11,0,0,0,5.1.83A15.91,15.91,0,0,0,153,227.3L187.32,193A15.91,15.91,0,0,0,192,181.64V123.31l4.77-4.77C223.45,91.86,224.6,59.71,223.85,47.12ZM74.36,80h42.33L77.16,119.52,40,114.34Zm74.41-9.45a76.65,76.65,0,0,1,59.11-22.47,76.46,76.46,0,0,1-22.42,59.16L128,164.68,91.32,128ZM176,181.64,141.67,216l-5.19-37.17L176,139.31Zm-74.16,9.5C97.34,201,82.29,224,40,224a8,8,0,0,1-8-8c0-42.29,23-57.34,32.86-61.85a8,8,0,0,1,6.64,14.56c-6.43,2.93-20.62,12.36-23.12,38.91,26.55-2.5,36-16.69,38.91-23.12a8,8,0,1,1,14.56,6.64Z"
				></path></svg
			></button
		>

		<TopBarClock on:openCalendar={() => navigateTo('calendar')} />

		<ActivityTicker onActivitySelect={handleActivitySelect} />

		<div class="bar-actions">
			<button
				class="button"
				aria-pressed={isSidebarOpen}
				onclick={toggleSidebar}
				aria-label="Toggle sidebar"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="var(--foreground)"
					viewBox="0 0 256 256"
					><path
						d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,56H80V200H40ZM216,200H96V56H216V200Z"
					></path></svg
				></button
			>
			<button
				class="button"
				aria-pressed={isPanelOpen}
				onclick={togglePanel}
				aria-label="Toggle panel"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="var(--foreground)"
					viewBox="0 0 256 256"
					><path
						d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm-64,80h64v16H136Zm0-16V88h64v16Zm0,48h64v16H136Zm64-80H136V56h64ZM56,56h64V200H56ZM200,200H136V184h64v16Z"
					></path></svg
				></button
			>

			{#if isMobile}
				<button class="button" onclick={handleToggleTheme} aria-label="Toggle theme">
					{#if activeTheme === 'dark'}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="var(--foreground)"
							viewBox="0 0 256 256"
							><path
								d="M240,96a8,8,0,0,1-8,8H216v16a8,8,0,0,1-16,0V104H184a8,8,0,0,1,0-16h16V72a8,8,0,0,1,16,0V88h16A8,8,0,0,1,240,96ZM144,56h8v8a8,8,0,0,0,16,0V56h8a8,8,0,0,0,0-16h-8V32a8,8,0,0,0-16,0v8h-8a8,8,0,0,0,0,16Zm72.77,97a8,8,0,0,1,1.43,8A96,96,0,1,1,95.07,37.8a8,8,0,0,1,10.6,9.06A88.07,88.07,0,0,0,209.14,150.33,8,8,0,0,1,216.77,153Zm-19.39,14.88c-1.79.09-3.59.14-5.38.14A104.11,104.11,0,0,1,88,64c0-1.79,0-3.59.14-5.38A80,80,0,1,0,197.38,167.86Z"
							></path></svg
						>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="var(--foreground)"
							viewBox="0 0 256 256"
							><path
								d="M120,40V32a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-8-8A8,8,0,0,0,50.34,61.66Zm0,116.68-8,8a8,8,0,0,0,11.32,11.32l8-8a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l8-8a8,8,0,0,0-11.32-11.32l-8,8A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l8,8a8,8,0,0,0,11.32-11.32ZM40,120H32a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Zm88,88a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-8A8,8,0,0,0,128,208Zm96-88h-8a8,8,0,0,0,0,16h8a8,8,0,0,0,0-16Z"
							></path></svg
						>
					{/if}
				</button>
			{/if}

			{#if isMobile}
				<button
					class="button"
					aria-pressed={currentView === 'settings'}
					onclick={() => navigateTo('settings')}
					aria-label="Settings"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="var(--foreground)"
						viewBox="0 0 256 256"
						><path
							d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"
						></path></svg
					></button
				>
			{/if}
		</div>
	</header>

	<aside class={`sidebar ${isSidebarOpen ? 'is-open' : ''}`}>
		<div class="section-title">Locations</div>
		<div class="nav-stack">
			<button
				class={`nav-item nav-home ${currentView === 'home' ? 'is-active' : ''}`}
				onclick={() => navigateTo('home')}>Home</button
			>

			<button
				class={`nav-item nav-starship ${currentView === 'starship' ? 'is-active' : ''}`}
				onclick={() => navigateTo('starship')}
			>
				<div class="nav-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="var(--foreground)"
						viewBox="0 0 256 256"
						><path
							d="M152,224a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,224ZM128,112a12,12,0,1,0-12-12A12,12,0,0,0,128,112Zm95.62,43.83-12.36,55.63a16,16,0,0,1-25.51,9.11L158.51,200h-61L70.25,220.57a16,16,0,0,1-25.51-9.11L32.38,155.83a16.09,16.09,0,0,1,3.32-13.71l28.56-34.26a123.07,123.07,0,0,1,8.57-36.67c12.9-32.34,36-52.63,45.37-59.85a16,16,0,0,1,19.6,0c9.34,7.22,32.47,27.51,45.37,59.85a123.07,123.07,0,0,1,8.57,36.67l28.56,34.26A16.09,16.09,0,0,1,223.62,155.83ZM99.43,184h57.14c21.12-37.54,25.07-73.48,11.74-106.88C156.55,47.64,134.49,29,128,24c-6.51,5-28.57,23.64-40.33,53.12C74.36,110.52,78.31,146.46,99.43,184Zm-15,5.85Q68.28,160.5,64.83,132.16L48,152.36,60.36,208l.18-.13ZM208,152.36l-16.83-20.2q-3.42,28.28-19.56,57.69l23.85,18,.18.13Z"
						></path></svg
					>
				</div>
				<div class="nav-label">Starship</div>
				<div class="nav-status" aria-label="Ship connection status">
					{#if $starship.connectionStatus === 'connected'}
						<span class="pip connected" aria-hidden="true"></span>
					{:else if $starship.connectionStatus === 'degraded'}
						<span class="pip degraded" aria-hidden="true"></span>
					{:else}
						<span class="pip disconnected" aria-hidden="true"></span>
					{/if}
				</div>
				<div class="nav-status-label" aria-label="Ship connection status">
					{#if $starship.connectionStatus === 'connected'}
						Online
					{:else if $starship.connectionStatus === 'degraded'}
						Degraded
					{:else}
						Offline
					{/if}
				</div></button
			>
		</div>

		<div class="section-title">Resources</div>
		<div class="nav-stack">
			<button
				class={`nav-item nav-player ${currentView === 'player' ? 'is-active' : ''}`}
				onclick={() => navigateTo('player')}>Ranger</button
			>
			<button
				class={`nav-item nav-inventory ${currentView === 'inventory' ? 'is-active' : ''}`}
				onclick={() => navigateTo('inventory')}>Inventory</button
			>
			<button
				class={`nav-item nav-equipment ${currentView === 'equipment' ? 'is-active' : ''}`}
				onclick={() => navigateTo('equipment')}>Equipment</button
			>
		</div>

		<div class="section-title">Communications</div>
		<div class="nav-stack">
			<button
				class={`nav-item nav-email ${currentView === 'email' ? 'is-active' : ''}`}
				onclick={() => navigateTo('email')}>Email</button
			>
			<button
				class={`nav-item nav-calendar ${currentView === 'calendar' ? 'is-active' : ''}`}
				onclick={() => navigateTo('calendar')}>Calendar</button
			>
		</div>

		<div class="section-title">Skills</div>
		<div class="nav-stack">
			<button
				class={`nav-item nav-sheltering ${currentView === 'sheltering' ? 'is-active' : ''}`}
				onclick={() => navigateTo('sheltering')}>Sheltering</button
			>
			<button
				class={`nav-item nav-woodcutting ${currentView === 'woodcutting' ? 'is-active' : ''}`}
				onclick={() => navigateTo('woodcutting')}>Woodcutting</button
			>
		</div>

		<div class="section-title">Miscellaneous</div>
		<div class="nav-stack">
			<button
				class={`nav-item nav-developer ${currentView === 'developer' ? 'is-active' : ''}`}
				onclick={() => navigateTo('developer')}>Developer</button
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
		{#if currentView === 'introduction'}
			<IntroductionView />
		{:else if currentView === 'starship'}
			<StarshipView />
		{:else if currentView === 'home'}
			<HomeView />
		{:else if currentView === 'email'}
			<EmailView />
		{:else if currentView === 'calendar'}
			<CalendarView />
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
			<SettingsView />
		{:else if currentView === 'sheltering'}
			<ShelteringView />
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
			<button class="button" onclick={closePanel} title="Close panel">
				<span class="close-icon"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="var(--foreground)"
						viewBox="0 0 256 256"
						><path
							d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
						></path></svg
					></span
				>
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
