<script lang="ts">
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
	<div class="content-header glass-card">
		<h1>Overview</h1>
		<p>
			Mobile-first, glassy scaffold with a fixed bar, collapsible sidebar, and overlay panel. Scroll
			each area independently and keep controls in view.
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

	<div class="card-grid">
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
</div>

<style>
	.home-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs);
		position: relative;
		overflow-y: auto;
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-xl);
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
		padding: var(--space-4xs);
		overflow: auto;
		scrollbar-width: none;
	}

	@media (width <= 768px) {
		.home-view {
			padding: var(--space-4xs);
		}
	}

	.section-block-spaced {
		display: grid;
		gap: var(--space-4xs);
	}
</style>
