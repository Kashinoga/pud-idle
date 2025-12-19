<script lang="ts">
	let {
		togglePanelWithItem,
		campfireState = $bindable({ isActive: false })
	}: {
		togglePanelWithItem: (itemId: string) => void;
		campfireState?: { isActive: boolean };
	} = $props();

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
</script>

<div class="view-app-container home-view">
	<div class="card">
		<div class="card-header">
			<div class="card-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="var(--foreground)"
					viewBox="0 0 256 256"
					><path
						d="M238.74,211.69,137.5,53.5l21.24-33.19a8,8,0,0,0-13.48-8.62L128,38.66l-17.26-27a8,8,0,1,0-13.48,8.62L118.5,53.5,17.26,211.69A8,8,0,0,0,24,224H232a8,8,0,0,0,6.74-12.31ZM86.3,208,128,142.84,169.7,208Zm102.4,0-54-84.31a8,8,0,0,0-13.48,0L67.3,208H38.62L128,68.34,217.38,208Z"
					></path></svg
				>
			</div>
			<h1>Basecamp</h1>
		</div>
		<div class="metadata-grid">
			<div class="metadata">
				<div class="metadata-title">Shelter Level</div>
				<div class="metadata-value">1</div>
			</div>
			<div class="metadata">
				<div class="metadata-title">Outdoor Temperature</div>
				<div class="metadata-value">0°F / 0°C</div>
			</div>
			<div class="metadata">
				<div class="metadata-title">Indoor Temperature</div>
				<div class="metadata-value">0°F / 0°C</div>
			</div>
		</div>
	</div>

	<div class="card-grid">
		<div class="card">
			<div class="card-header">
				<h2>Sleeping Area</h2>
				<button class="card-header-button">+</button>
			</div>
			<div class="card-grid">
				<div class="card card-locked">
					<h3>Sleeping Bag</h3>
				</div>
				<div class="card card-locked">
					<h3>Resting Mat</h3>
				</div>
			</div>
			<div class="card-lore">
				<p>Rest here to recover energy and health.</p>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h2>Cooking Area</h2>
				<button class="card-header-button">+</button>
			</div>
			<div class="card-grid">
				<div
					class="card"
					role="button"
					tabindex="0"
					onclick={() => togglePanelWithItem('campfire')}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							togglePanelWithItem('campfire');
						}
					}}
					style="cursor: pointer;"
				>
					<h3>Campfire</h3>
					{#if campfireState.isActive}
						<div
							style="margin-top: 0.5rem; color: orange; font-size: 0.875rem;"
						>
							Fire is burning
						</div>
					{:else}
						<div style="margin-top: 0.5rem; color: var(--muted-foreground); font-size: 0.875rem;">
							Fire is out
						</div>
					{/if}
				</div>
				<div class="card card-locked">
					<h3>Cooking Pot</h3>
				</div>
			</div>
			<div class="card-lore">
				<p>Prepare meals here to restore energy and health.</p>
			</div>
		</div>
	</div>

	<div class="card card-locked">
		<div class="card-header card-header-locked">
			<h2>Extend Area</h2>
		</div>

		<div class="card">Unlock this area by reaching Shelter Level 2.</div>
	</div>
</div>

<style>
	.home-view {
		background:
			radial-gradient(ellipse at 15% 40%, rgba(59, 130, 246, 0.32) 0%, transparent 45%),
			radial-gradient(ellipse at 85% 20%, rgba(30, 144, 255, 0.28) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 60%, rgba(72, 187, 255, 0.2) 0%, transparent 55%),
			radial-gradient(ellipse at 70% 80%, rgba(165, 180, 252, 0.18) 0%, transparent 50%),
			linear-gradient(
				135deg,
				rgba(59, 130, 246, 0.1) 0%,
				rgba(30, 144, 255, 0.08) 50%,
				rgba(72, 187, 255, 0.06) 100%
			);
	}
</style>
