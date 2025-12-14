<div class="view-app-container starship-view">
	<div class="content-header">
		<h1>Starship Operations</h1>
		<p>Your lifeline to the Densette pocket universe—transport, supply, and emergency support.</p>
	</div>

	<div class="starship-grid">
		<section class="starship-card">
			<h2 class="card-title">Transit & Orbit</h2>
			<p>
				The IPR courier vessel keeps a stable orbit outside the Densette gateway. It ferries you to
				and from the surface, coordinating insertion windows with station control.
			</p>
			<div class="meta-row">
				<div class="meta">
					<div class="label">Status</div>
					<div class="value">On station</div>
				</div>
				<div class="meta">
					<div class="label">Next window</div>
					<div class="value">T-42m</div>
				</div>
			</div>
		</section>

		<section class="starship-card">
			<h2 class="card-title">Supply Runs</h2>
			<p>
				Automated drops deliver essentials: rations, medkits, replacement tools, and data spools.
				Run requests are prioritized by mission status and health.
			</p>
			<ul class="supply-list">
				<li><span>Next drop</span><strong>ETA 18m</strong></li>
				<li><span>Payload</span><strong>Rations ×6, Medkits ×2, Toolkits ×1</strong></li>
				<li><span>Priority</span><strong>Standard</strong></li>
			</ul>
			<div class="actions">
				<button class="primary-button">Request Priority Drop</button>
				<button class="ghost-button">View Cargo Manifest</button>
			</div>
		</section>

		<section class="starship-card">
			<h2 class="card-title">Emergency Support</h2>
			<p>
				The ship monitors your vitals and pulls you out of critical states, preventing casualty in
				normal runs. Extraction beacons can be triggered manually.
			</p>
			<ul class="supply-list">
				<li><span>Auto-stabilization</span><strong>Enabled</strong></li>
				<li><span>Beacon status</span><strong>Armed</strong></li>
				<li><span>Recovery window</span><strong>&lt; 5s response</strong></li>
			</ul>
			<div class="actions">
				<button class="primary-button">Trigger Beacon</button>
				<button class="ghost-button">Review Safety Protocols</button>
			</div>
		</section>

		<section class="starship-card">
			<h2 class="card-title">Mission Context</h2>
			<p>
				Your starship is coordinated with the Denver Base of Operations. Stella Alvarez relays
				assignments and mission updates; all uplinks are buffered through the ship's comms array to
				avoid temporal drift.
			</p>
			<p>
				Stay supplied, stay linked—every successful run feeds back into the greater IPR effort across
				pocket universes.
			</p>
		</section>
	</div>
</div>

<style>
	.starship-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background:
			radial-gradient(ellipse at 25% 20%, rgba(37, 99, 235, 0.18) 0%, transparent 55%),
			radial-gradient(ellipse at 75% 80%, rgba(14, 165, 233, 0.16) 0%, transparent 55%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(14, 165, 233, 0.07) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		overflow: auto;
	}

	.starship-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-md);
	}

	.starship-card {
		padding: var(--space-sm);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		background: var(--surface);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
		transition: all 160ms ease;
	}

	.starship-card:hover {
		border-color: var(--primary);
		box-shadow: 0 10px 28px rgba(59, 130, 246, 0.18);
		transform: translateY(-2px);
	}

	.card-title {
		margin: 0;
		font-size: 1.15rem;
		font-weight: 650;
		color: var(--primary);
	}

	.meta-row {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs);
	}

	.label {
		font-size: 0.85rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.value {
		font-weight: 700;
		font-size: 1rem;
	}

	.supply-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3xs);
	}

	.supply-list li {
		display: flex;
		justify-content: space-between;
		gap: var(--space-sm);
		font-size: 0.95rem;
	}

	.supply-list span {
		color: var(--muted);
	}

	.actions {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}

	@media (max-width: 767px) {
		.starship-view {
			padding: var(--space-sm);
			gap: var(--space-sm);
		}

		.starship-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
