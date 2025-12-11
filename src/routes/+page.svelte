<script lang="ts">
	// Svelte 5 Runes require an assignable binding for $state values.
	// Use `let`, not `const`, because we reassign them in event handlers.
	let leftCollapsed = $state(false);
	let rightOpen = $state(false);

	function toggleLeft() { leftCollapsed = !leftCollapsed }
	function toggleRight() { rightOpen = !rightOpen }
	function closeRight() { rightOpen = false }
</script>

<div class="app" class:left-collapsed={leftCollapsed} class:right-open={rightOpen}>
	<div class="toolbar" role="toolbar" aria-label="Layout controls">
		<button on:click={toggleLeft} aria-pressed={!leftCollapsed} aria-controls="left">Toggle left</button>
		<button on:click={toggleRight} aria-pressed={rightOpen} aria-controls="right">Toggle right overlay</button>
		<span class="hint">Left content never reflows. Center resizes. Right overlays.</span>
	</div>

	<div class="shell">
		<!-- Spacer that participates in layout -->
		<aside id="left" class="left" aria-hidden="true"></aside>

		<!-- Visible left pane that slides; its text never reflows -->
		<div class="left-pane" role="complementary" aria-label="Sidebar">
			<h3 style="margin:12px;">Left Sidebar</h3>
			<p style="color:#cbd5e1; margin:12px;">Collapses without text shifting; center resizes.</p>
		</div>

		<main class="center" aria-label="Main content">
			<h1>Center Content</h1>
			<p>Resize the window and use the toolbar buttons to test the layout.</p>
		</main>

		<div class="scrim" aria-hidden={!rightOpen} on:click={closeRight}></div>

		<aside id="right" class="right-overlay" role="dialog" aria-modal="true" aria-labelledby="right-title" aria-hidden={!rightOpen}>
			<header>
				<h3 id="right-title">Right Overlay</h3>
				<button class="close" on:click={closeRight}>Close</button>
			</header>
			<div class="body">
				<p>This panel overlays the center and does not affect layout width.</p>
			</div>
		</aside>
	</div>
</div>