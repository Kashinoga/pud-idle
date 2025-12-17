<script lang="ts">
	import { starship, type BeaconStatus, type ConnectionStatus } from '$lib/stores/starship';

	const { requestPriorityDrop, triggerBeacon } = starship;

	const connectionLabels: Record<ConnectionStatus, string> = {
		connected: 'Online',
		degraded: 'Degraded',
		disconnected: 'Disconnected'
	};

	const beaconLabels: Record<BeaconStatus, string> = {
		armed: 'Armed',
		engaged: 'Engaged',
		cooldown: 'Cooldown'
	};

	const formatPayload = (payload: { label: string; count: number }[]) =>
		payload.map((item) => `${item.label} ×${item.count}`).join(', ');

	const changeStarshipConnection = (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const newStatus = target.value as ConnectionStatus;
		starship.setConnectionStatus(newStatus);
	};
</script>

<div class="view-app-container starship-view">
	<div class="content-header card">
		<h1>Starship {$starship.name}</h1>
		<div class="starship-metadata">
			<div class="metadata">
				<div class="metadata-label">Connection Status</div>
				<div class="metadata-value-with-pip">
					<div class="status-pip">
						{#if $starship.connectionStatus === 'connected'}
							<div class="pip connected"></div>
						{:else if $starship.connectionStatus === 'degraded'}
							<div class="pip degraded"></div>
						{:else}
							<div class="pip disconnected"></div>
						{/if}
					</div>
					<span>{connectionLabels[$starship.connectionStatus]}</span>
				</div>
			</div>
			<div class="metadata">
				<div class="metadata-label">Last Message</div>
				<div class="metadata-value">{$starship.lastMessage}</div>
			</div>
		</div>
		<p>Your lifeline to the Densette pocket universe—transport, supply, and emergency support.</p>
	</div>

	<div class="starship-grid">
		<section class="card">
			<h2 class="card-title">Orbital Schedule</h2>
			<div class="card-metadata">
				<div class="metadata">
					<div class="metadata-label">Status</div>
					<div class="metadata-value">{$starship.transit.status}</div>
				</div>
				<div class="metadata">
					<div class="metadata-label">Next Event</div>
					<div class="metadata-value">T-{$starship.transit.nextWindowMinutes}m</div>
				</div>
			</div>
			<div class="card-description">
				<div class="orbital-schedule">
					<div class="schedule-header">
						<div>Next 24 Hours</div>
						<div class="schedule-meta">Starship Events</div>
					</div>
					<div class="schedule-grid">
						<div class="schedule-indicator"></div>
						<div class="schedule-dot"></div>
						<div class="schedule-item">
							<div class="schedule-label">Leave for Resupply</div>
							<div class="schedule-time-til">T-{$starship.transit.nextWindowMinutes}m</div>
							<div class="schedule-duration">{$starship.transit.nextWindowMinutes}m</div>
						</div>
						<div class="schedule-dot"></div>
						<div class="schedule-item">
							<div class="schedule-label">Solar recharge</div>
							<div class="schedule-time-til">T-{$starship.transit.nextWindowMinutes}m</div>
							<div class="schedule-duration">{$starship.transit.nextWindowMinutes}m</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-lore">
				<p>
					The IPR courier vessel keeps a stable orbit outside the Densette gateway. It ferries you
					to and from the surface, coordinating insertion windows with station control.
				</p>
			</div>
		</section>

		<section class="card">
			<h2 class="card-title">Supply Runs</h2>
			<div class="card-description">
				<p>
					Automated drops deliver essentials: rations, medkits, replacement tools, and data spools.
					Run requests are prioritized by mission status and health.
				</p>
				<ul class="card-list">
					<li><span>Next drop</span><strong>ETA {$starship.supply.nextDropMinutes}m</strong></li>
					<li><span>Priority</span><strong>{$starship.supply.priority}</strong></li>
					<li><span>Payload</span><strong>{formatPayload($starship.supply.payload)}</strong></li>
				</ul>
			</div>
			<div class="card-actions">
				<button class="primary-button" onclick={requestPriorityDrop}>Request Priority Drop</button>
				<button class="button">View Cargo Manifest</button>
			</div>
		</section>

		<section class="card">
			<h2 class="card-title">Emergency Support</h2>
			<div class="card-description">
				<p>
					The ship monitors your vitals and pulls you out of critical states, preventing casualty in
					normal runs. Extraction beacons can be triggered manually.
				</p>
				<ul class="card-list">
					<li>
						<span>Auto-stabilization</span>
						<strong>{$starship.emergency.autoStabilization ? 'Enabled' : 'Disabled'}</strong>
					</li>
					<li>
						<span>Beacon status</span><strong
							>{beaconLabels[$starship.emergency.beaconStatus]}</strong
						>
					</li>
					<li>
						<span>Recovery window</span><strong
							>&lt; {$starship.emergency.responseSeconds}s response</strong
						>
					</li>
				</ul>
			</div>
			<div class="card-actions">
				<button class="primary-button" onclick={triggerBeacon}>Trigger Beacon</button>
				<button class="button">Review Safety Protocols</button>
			</div>
		</section>

		<section class="card">
			<h2 class="card-title">Mission Context</h2>
			<div class="card-description">
				<p>
					Your starship is coordinated with the Denver Base of Operations. Stella Alvarez relays
					assignments and mission updates; all uplinks are buffered through the ship's comms array
					to avoid temporal drift.
				</p>
				<p>
					Stay supplied, stay linked—every successful run feeds back into the greater IPR effort
					across pocket universes.
				</p>
			</div>
		</section>
	</div>

	<div class="content-header card">
		<h1>Starship Developer Console</h1>
		<p>Developer tools and diagnostics for the starship.</p>

		<div class="card">
			<h3 class="card-title">Developer Tools</h3>
			<p>Use these tools to simulate various scenarios and test the starship's systems.</p>
			<ul class="card-list">
				<li><span>Simulate drop</span><strong>Not implemented</strong></li>
				<li><span>Trigger emergency</span><strong>Not implemented</strong></li>
				<li><span>Reset ship</span><strong>Not implemented</strong></li>
				<li>
					<span>Connection Status</span><select
						value={$starship.connectionStatus}
						onchange={changeStarshipConnection}
					>
						<option value="connected">Connected</option>
						<option value="degraded">Degraded</option>
						<option value="disconnected">Disconnected</option>
					</select>
				</li>
			</ul>
		</div>
	</div>
</div>

<style>
	.starship-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		background:
			radial-gradient(ellipse at 25% 20%, rgba(37, 99, 235, 0.18) 0%, transparent 55%),
			radial-gradient(ellipse at 75% 80%, rgba(14, 165, 233, 0.16) 0%, transparent 55%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(14, 165, 233, 0.07) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xs);
		overflow: auto;
		scrollbar-width: none;
	}

	.starship-metadata {
		display: flex;
		gap: var(--space-4xs);
		align-items: start;
	}

	.metadata {
		background-color: var(--surface);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-liquid-glass-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs);
		padding: var(--space-2xs) var(--space-xs);
	}

	.metadata-label {
		font-weight: bold;
		text-transform: uppercase;
		font-size: x-small;
	}

	.metadata-value {
		font-size: small;
	}

	.metadata-value-with-pip {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
		font-size: small;
	}

	@keyframes slowPingConnected {
		0%,
		100% {
			box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.18);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
		}
	}

	@keyframes slowPingDegraded {
		0%,
		100% {
			box-shadow: 0 0 0 6px rgba(245, 158, 11, 0.2);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(245, 158, 11, 0);
		}
	}

	@keyframes slowPingDisconnected {
		0%,
		100% {
			box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.2);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
		}
	}

	.status-pip .pip {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: var(--muted);
	}

	.pip.connected {
		background-color: #22c55e;
		animation: slowPingConnected 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.pip.degraded {
		background-color: #f59e0b;
		animation: slowPingDegraded 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.pip.disconnected {
		background-color: #ef4444;
		animation: slowPingDisconnected 2s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	/* Starship grid */
	.starship-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: var(--space-xs);
	}

	/* Mobile view */
	@media (max-width: 767px) {
		.starship-grid {
			grid-template-columns: 1fr;
		}
	}

	.orbital-schedule {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(37, 99, 235, 0.04));
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-liquid-glass-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-4xs);
		padding: var(--space-xs);
		position: relative;
		overflow: hidden;
	}

	.schedule-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: small;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding-bottom: var(--space-4xs);
		border-bottom: 1px solid var(--surface-border);
	}

	.schedule-meta {
		color: var(--muted);
		font-size: x-small;
		font-weight: 500;
		text-transform: none;
	}

	.schedule-grid {
		display: grid;
		grid-template-columns: 28px 1fr auto auto;
		column-gap: var(--space-4xs);
		row-gap: var(--space-4xs);
		position: relative;
	}

	@media (max-width: 767px) {
		.schedule-grid {
			grid-template-columns: 24px 1fr;
		}
	}

	.schedule-indicator {
		position: absolute;
		left: 13px;
		top: 0;
		bottom: 0;
		width: 2px;
		pointer-events: none;
		z-index: 0;
	}

	@media (max-width: 767px) {
		.schedule-indicator {
			left: 11px;
		}
	}

	.schedule-indicator::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(37, 99, 235, 0.55), rgba(34, 211, 238, 0.25));
		opacity: 1;
	}

	.schedule-item {
		position: relative;
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: var(--space-xs);
		align-items: center;
		padding: var(--space-xs);
		background: var(--surface);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-liquid-glass-sm);
		overflow: hidden;
	}

	@media (max-width: 767px) {
		.schedule-item {
			grid-template-columns: 1fr;
		}
	}

	.schedule-dot {
		grid-column: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1;
	}

	.schedule-dot::before {
		content: '';
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--primary), var(--view-home));
		box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.12);
	}

	.schedule-label {
		font-weight: 600;
	}

	.schedule-time-til,
	.schedule-duration {
		font-size: small;
		padding: var(--space-4xs) var(--space-2xs);
		border-radius: var(--radius-xs);
		background: rgba(37, 99, 235, 0.08);
		border: 1px solid rgba(37, 99, 235, 0.12);
		white-space: nowrap;
	}

	@media (max-width: 767px) {
		.schedule-time-til,
		.schedule-duration {
			justify-self: start;
		}
	}

	.schedule-duration {
		background: rgba(34, 211, 238, 0.08);
		border-color: rgba(34, 211, 238, 0.16);
	}
</style>
