<div class="view-app-container introduction-view">
	<div class="card">
		<div class="content-header">
			<h1 class="title">Intergalactic Park Ranger</h1>
			<p class="subtitle">Welcome to the Densette Universe</p>
		</div>
		<div class="decoration">🚀</div>
	</div>

	<div class="card-grid">
		<section class="card">
			<h2>About IPR</h2>
			<p>
				You are an Intergalactic Park Ranger deployed to explore and catalog the infinite pocket
				universes discovered by humanity's greatest explorers. Your mission: gather resources, craft
				equipment, and unlock the mysteries of each pocket universe.
			</p>
			<p>
				As a ranger, you manage your own camp and workstation, gathering materials from the
				environment and improving your equipment to become more efficient.
			</p>
		</section>

		<section class="card">
			<h2>The Densette Universe</h2>
			<p>
				The Densette Universe is one of the most recently discovered pocket universes—a realm of
				lush forests, abundant resources, and quiet solitude. It exists parallel to our own,
				accessible only through specialized gateway technology.
			</p>
			<p>
				Here, the laws of physics bend slightly differently. Time flows at a different pace, seasons
				cycle with mysterious regularity, and the natural world thrives in ways never before
				documented.
			</p>
		</section>

		<section class="card">
			<h2>Getting Started</h2>
			<p>
				Begin by exploring the <strong>Woodcutting</strong> area to gather basic resources. Use the
				inventory system to track what you find, then visit <strong>Equipment</strong> to craft better
				tools.
			</p>
			<p>
				Check your <strong>Character</strong> stats to see your progress, read
				<strong>Email</strong>
				for mission briefings, and review the <strong>Activity</strong> ticker in the top bar to see
				your recent actions.
			</p>
		</section>

		<section class="card">
			<h2>The Denver Base</h2>
			<p>
				You are part of the Denver Base of Operations, one of humanity's largest pocket universe
				research facilities. Stella Alvarez, the Assignments Coordinator, regularly sends you
				mission briefings and assignment updates.
			</p>
			<p>
				Your work here is part of a larger effort to understand and document the infinite pocket
				universes. Every resource you gather, every level you gain, and every discovery you make
				contributes to our collective knowledge.
			</p>
		</section>
	</div>

	<div class="card">
		<p class="footer-text">Good luck, Ranger. The Densette Universe awaits. 🌍</p>
	</div>
</div>

<style>
	.introduction-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		background:
			radial-gradient(ellipse at 25% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 75% 80%, rgba(37, 99, 235, 0.2) 0%, transparent 55%),
			radial-gradient(ellipse at 50% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 65%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.08) 100%);
		border: 1px solid var(--surface-border);
		padding: var(--space-2xs);
		overflow-y: auto;
	}

	@media (max-width: 768px) {
		.introduction-view {
			padding: var(--space-2xs);
		}
	}
</style>
