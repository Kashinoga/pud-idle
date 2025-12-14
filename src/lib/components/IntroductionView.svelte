<div class="view-app-container introduction-view">
	<div class="intro-hero">
		<div class="hero-content">
			<h1 class="hero-title">Intergalactic Park Ranger</h1>
			<p class="hero-subtitle">Welcome to the Densette Universe</p>
		</div>
		<div class="hero-decoration">🚀</div>
	</div>

	<div class="intro-sections">
		<section class="intro-card">
			<h2 class="intro-heading">About IPR</h2>
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

		<section class="intro-card">
			<h2 class="intro-heading">The Densette Universe</h2>
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

		<section class="intro-card">
			<h2 class="intro-heading">Getting Started</h2>
			<p>
				Begin by exploring the <strong>Woodcutting</strong> area to gather basic resources. Use the
				inventory system to track what you find, then visit <strong>Equipment</strong> to craft better
				tools.
			</p>
			<p>
				Check your <strong>Character</strong> stats to see your progress, read <strong>Email</strong>
				for mission briefings, and review the <strong>Activity</strong> ticker in the top bar to see
				your recent actions.
			</p>
		</section>

		<section class="intro-card">
			<h2 class="intro-heading">The Denver Base</h2>
			<p>
				You are part of the Denver Base of Operations, one of humanity's largest pocket universe
				research facilities. Stella Alvarez, the Assignments Coordinator, regularly sends you mission
				briefings and assignment updates.
			</p>
			<p>
				Your work here is part of a larger effort to understand and document the infinite pocket
				universes. Every resource you gather, every level you gain, and every discovery you make
				contributes to our collective knowledge.
			</p>
		</section>
	</div>

	<div class="intro-footer">
		<p class="footer-text">
			Good luck, Ranger. The Densette Universe awaits. 🌍
		</p>
	</div>
</div>

<style>
	.introduction-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background:
			radial-gradient(ellipse at 25% 20%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 75% 80%, rgba(37, 99, 235, 0.2) 0%, transparent 55%),
			radial-gradient(ellipse at 50% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 65%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.08) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		overflow-y: auto;
	}

	.intro-hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-md);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		background:
			linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(37, 99, 235, 0.06)),
			linear-gradient(to right, rgba(96, 165, 250, 0.05), transparent);
		gap: var(--space-md);
	}

	.hero-content {
		flex: 1;
	}

	.hero-title {
		margin: 0 0 var(--space-2xs) 0;
		font-size: 2.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero-subtitle {
		margin: 0;
		font-size: 1.2rem;
		color: var(--muted-foreground);
	}

	.hero-decoration {
		font-size: 4rem;
		opacity: 0.8;
	}

	.intro-sections {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-md);
	}

	.intro-card {
		padding: var(--space-sm);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		background: var(--surface);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		transition: all 160ms ease;
	}

	.intro-card:hover {
		border-color: var(--primary);
		box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
		transform: translateY(-2px);
	}

	.intro-heading {
		margin: 0 0 var(--space-3xs) 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--primary);
	}

	.intro-card p {
		margin: 0 0 0.75rem 0;
		color: var(--foreground);
		line-height: 1.6;
		font-size: 0.95rem;
	}

	.intro-card p:last-child {
		margin-bottom: 0;
	}

	.intro-card strong {
		font-weight: 600;
		color: var(--foreground);
	}

	.intro-footer {
		text-align: center;
		padding: var(--space-sm);
		border-top: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		background: var(--surface);
	}

	.footer-text {
		margin: 0;
		color: var(--muted-foreground);
		font-size: 1rem;
		font-style: italic;
	}

	@media (max-width: 767px) {
		.introduction-view {
			padding: var(--space-sm);
			gap: var(--space-sm);
		}

		.intro-hero {
			flex-direction: column;
			text-align: center;
			padding: var(--space-sm);
		}

		.hero-title {
			font-size: 1.8rem;
		}

		.hero-subtitle {
			font-size: 1rem;
		}

		.hero-decoration {
			font-size: 3rem;
		}

		.intro-sections {
			grid-template-columns: 1fr;
		}
	}
</style>
