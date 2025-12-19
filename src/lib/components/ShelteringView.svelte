<script lang="ts">
</script>

<div class="view-app-container sheltering-view">
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
						d="M255.31,188.75l-64-144A8,8,0,0,0,184,40H72a8,8,0,0,0-7.27,4.69.21.21,0,0,0,0,.06l0,.12,0,0L.69,188.75A8,8,0,0,0,8,200H248a8,8,0,0,0,7.31-11.25ZM64,184H20.31L64,85.7Zm16,0V85.7L123.69,184Zm61.2,0L84.31,56H178.8l56.89,128Z"
					></path></svg
				>
			</div>
			<h1>Sheltering</h1>
		</div>
		<p>Building shelter to protect yourself from the elements.</p>
	</div>

	<div class="card">
		<div class="card-header">
			<div class="card-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="var(--foreground)"
					viewBox="0 0 256 256"
					><path d="M216,104a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H208A8,8,0,0,1,216,104Z"></path></svg
				>
			</div>
			<h2>Progress</h2>
		</div>
		<p>Current progress towards building your shelter.</p>
	</div>
</div>

<style>
	.sheltering-view {
		background:
			radial-gradient(ellipse at 25% 20%, rgba(37, 99, 235, 0.18) 0%, transparent 55%),
			radial-gradient(ellipse at 75% 80%, rgba(14, 165, 233, 0.16) 0%, transparent 55%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(14, 165, 233, 0.07) 100%);
	}
</style>
