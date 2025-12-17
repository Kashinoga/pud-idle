<script lang="ts">
	type Email = {
		id: number;
		from: string;
		subject: string;
		preview: string;
		time: string;
		read: boolean;
		body?: string;
	};

	let selectedEmailId = $state<number | null>(null);
	let emails = $state<Email[]>([
		{
			id: 1,
			from: 'Stella Alvarez',
			subject: 'New Assignment: LPU-1031 Recovery Mission',
			preview:
				'We have a new LPU assignment available to you and your team. This PU, designated LPU-1031...',
			time: 'Today',
			read: false,
			body: `Pleasantries in your time, agent.

We have a new LPU assignment available to you and your team. This PU, designated LPU-1031, was discovered during the maiden deployment of the latest Lost Pocket Universe Recovery Robot, LPURR-40, or "Juniper".

June's latest report indicates no dangers or hazards encountered in this LPU (so far). We invite your team to accept this high-priority assignment to further explore and document LPU-1031, and to provide an LPUR after you have completed your findings.

For acceptance of this assignment, please respond to this ARL within two weeks of reception.

The full briefing is attached.

Temperate regards,

Stella Alvarez, Assignments Coordinator

Denver Base of Operations, Pocket Universe Division`
		},
		{
			id: 2,
			from: 'Marcus Johnson',
			subject: 'Meeting Notes - Design Review',
			preview: "Thanks for joining today's design review. Here are the key takeaways...",
			time: '9:45 AM',
			read: true
		},
		{
			id: 3,
			from: 'Emma Wilson',
			subject: 'Welcome to the Team!',
			preview: "We're excited to have you join us. Here's some information to get started...",
			time: 'Yesterday',
			read: true
		},
		{
			id: 4,
			from: 'Alex Rodriguez',
			subject: 'Feedback on Proposal',
			preview: "I've reviewed the proposal you sent last week. Overall, I think it's solid...",
			time: 'Yesterday',
			read: false
		},
		{
			id: 5,
			from: 'Jordan Lee',
			subject: 'Quick Question About Timeline',
			preview: 'Hey, do you have a moment to clarify the timeline for the new feature rollout?',
			time: '2 days ago',
			read: true
		},
		{
			id: 6,
			from: 'Taylor Kim',
			subject: 'Calendar Invite: Team Sync',
			preview: "You're invited to our weekly team sync on Friday at 2 PM...",
			time: '2 days ago',
			read: true
		},
		{
			id: 7,
			from: 'Chris Martinez',
			subject: 'Documentation Updates',
			preview: "I've updated the project documentation with the latest API changes...",
			time: '3 days ago',
			read: false
		},
		{
			id: 8,
			from: 'Riley Parker',
			subject: 'Bug Report - Login Issue',
			preview: "We've received reports of users experiencing login issues on mobile devices...",
			time: '3 days ago',
			read: true
		}
	]);

	const selectEmail = (id: number) => {
		selectedEmailId = id;
		const email = emails.find((e) => e.id === id);
		if (email) {
			email.read = true;
		}
	};

	const backToInbox = () => {
		selectedEmailId = null;
	};

	const selectedEmail = $derived(emails.find((e) => e.id === selectedEmailId));
</script>

<div class="view-app-container email-container {selectedEmailId ? 'has-selected' : ''}">
	<!-- Email List -->
	<div
		class="email-list glass-surface glass-border glass-radius glass-shadow-soft {selectedEmailId
			? 'mobile-hidden'
			: ''}"
	>
		<div
			class="email-list-header glass-surface glass-border glass-shadow-top glass-shadow-accent--email"
		>
			<h2>Inbox</h2>
			<span class="email-count">{emails.filter((e) => !e.read).length} unread</span>
		</div>
		<div class="email-items">
			{#each emails as email}
				<button
					class="email-item {email.id === selectedEmailId ? 'selected' : ''} {email.read
						? 'read'
						: 'unread'}"
					onclick={() => selectEmail(email.id)}
				>
					<div class="email-item-header">
						<span class="email-from">{email.from}</span>
						<span class="email-time">{email.time}</span>
					</div>
					<div class="email-subject">{email.subject}</div>
					<div class="email-preview">{email.preview}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Email Detail -->
	<div
		class="email-detail glass-surface glass-border glass-radius glass-shadow-soft {selectedEmailId
			? 'mobile-visible'
			: ''}"
	>
		{#if selectedEmail}
			<div class="email-detail-header glass-surface glass-shadow-top glass-shadow-accent--email">
				<div class="email-header-top">
					<button class="back-button" onclick={backToInbox}>
						<span class="back-arrow">←</span> Back to Inbox
					</button>
					<button class="close-button" onclick={backToInbox} title="Close email">
						<span class="close-icon">✕</span>
					</button>
				</div>
				<h2>{selectedEmail.subject}</h2>
				<div class="email-meta">
					<div class="email-sender">
						<div class="sender-avatar">{selectedEmail.from.charAt(0)}</div>
						<div class="sender-info">
							<div class="sender-name">{selectedEmail.from}</div>
							<div class="sender-time">{selectedEmail.time}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="email-body">
				{#if selectedEmail.body}
					{#each selectedEmail.body.split('\n') as line}
						{#if line.trim()}
							<p>{line}</p>
						{:else}
							<div class="email-paragraph-break"></div>
						{/if}
					{/each}
				{:else}
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</p>
					<p>
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
						nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
						officia deserunt mollit anim id est laborum.
					</p>
				{/if}
			</div>
			<div
				class="email-actions glass-surface glass-border glass-shadow-bottom glass-shadow-accent--email"
			>
				<button class="primary-button">Reply</button>
				<button class="button">Forward</button>
				<button class="button">Archive</button>
			</div>
		{:else}
			<div class="email-empty">
				<p>Select an email to read</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.email-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		position: relative;
		background:
			radial-gradient(ellipse at 15% 25%, rgba(59, 130, 246, 0.28) 0%, transparent 45%),
			radial-gradient(ellipse at 85% 70%, rgba(37, 99, 235, 0.22) 0%, transparent 55%),
			radial-gradient(ellipse at 50% 50%, rgba(96, 165, 250, 0.16) 0%, transparent 60%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(37, 99, 235, 0.1) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-2xs);
		overflow: auto;
		max-height: 100dvh;
	}

	@media (width > 768px) {
		.email-container {
			grid-template-columns: 240px 1fr;
		}

		/* Shrink inbox when viewing an email */
		.email-container.has-selected {
			grid-template-columns: 240px 1fr;
		}
	}

	@media (width <= 768px) {
		.email-container {
			display: flex;
			flex-direction: column;
			grid-template-columns: 1fr;
			padding: var(--space-2xs);
		}

		.email-list-header {
			padding: var(--space-2xs);
		}

		.email-item {
			padding: var(--space-2xs);
		}

		.email-detail-header,
		.email-body {
			padding: var(--space-2xs);
		}

		.email-actions {
			padding: var(--space-2xs);
		}

		/* Mobile: show only one view at a time */
		.email-list.mobile-hidden {
			display: none;
		}

		.email-detail {
			display: none;
		}

		.email-detail.mobile-visible {
			display: flex;
		}
	}

	.email-list {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.email-list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-sm);
		border-bottom: 1px solid var(--surface-border);
		border-top-left-radius: var(--radius-lg);
		border-top-right-radius: var(--radius-lg);
	}

	.email-list-header h2 {
		margin: 0;
		font-size: 1.25rem;
	}

	.email-count {
		font-size: 0.875rem;
		color: var(--muted);
		background: var(--primary-soft);
		padding: 0.25rem 0.65rem;
		border-radius: 999px;
		border: 1px solid var(--surface-border);
	}

	.email-items {
		overflow-y: auto;
		flex: 1;
	}

	.email-item {
		display: block;
		width: 100%;
		text-align: left;
		padding: var(--space-sm);
		border: none;
		border-bottom: 1px solid var(--surface-border);
		background: transparent;
		cursor: pointer;
		transition: background 150ms ease;
		box-shadow: none;
		border-radius: 0;
	}

	.email-item:hover {
		background: var(--primary-soft);
		transform: none;
		box-shadow: none;
	}

	.email-item.read {
		opacity: 0.4;
	}

	.email-item.selected {
		background: var(--primary-soft);
		border-left: 3px solid var(--primary);
		opacity: 1;
		box-shadow:
			0 8px 24px rgba(59, 130, 246, 0.25),
			0 2px 10px rgba(37, 99, 235, 0.18),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.email-item.unread .email-from,
	.email-item.unread .email-subject {
		font-weight: 600;
	}

	.email-item-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.25rem;
	}

	.email-from {
		font-size: 0.95rem;
	}

	.email-time {
		font-size: 0.8rem;
		color: var(--muted);
	}

	.email-subject {
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}

	.email-preview {
		font-size: 0.85rem;
		color: var(--muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.email-detail {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.email-detail-header {
		padding: var(--space-sm);
		border-top-left-radius: var(--radius-lg);
		border-top-right-radius: var(--radius-lg);
	}

	.email-header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.email-detail-header h2 {
		margin: 0 0 1rem 0;
		font-size: 1.35rem;
	}

	.email-meta {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.email-sender {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.sender-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--primary);
		color: var(--background);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.sender-info {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.sender-name {
		font-weight: 600;
		font-size: 0.95rem;
	}

	.sender-time {
		font-size: 0.8rem;
		color: var(--muted);
	}

	.email-body {
		flex: 1;
		padding: var(--space-sm);
		overflow-y: auto;
		line-height: 1.6;
	}

	.email-body p {
		margin: 0 0 1rem 0;
	}

	.email-actions {
		display: flex;
		gap: 0.75rem;
		padding: var(--space-sm);
		border-top: 1px solid var(--surface-border);
		border-bottom-left-radius: var(--radius-lg);
		border-bottom-right-radius: var(--radius-lg);
	}

	@media (max-width: 767px) {
		.email-container {
			padding: var(--space-2xs);
		}

		.email-list-header {
			padding: var(--space-2xs);
		}

		.email-item {
			padding: var(--space-2xs);
		}

		.email-detail-header,
		.email-body {
			padding: var(--space-2xs);
		}

		.email-actions {
			padding: var(--space-2xs);
		}
	}

	.email-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		color: var(--muted);
		font-size: 1.1rem;
	}

	.email-paragraph-break {
		height: 0.5rem;
	}

	.back-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: transparent;
		border: none;
		color: var(--primary);
		padding: 0.5rem 0;
		font-weight: 500;
		cursor: pointer;
		box-shadow: none;
	}

	.back-button:hover {
		transform: none;
		box-shadow: none;
		color: var(--accent);
	}

	.back-arrow {
		font-size: 1.2rem;
	}

	.close-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: transparent;
		border: 1px solid var(--surface-border);
		border-radius: 50%;
		color: var(--muted);
		padding: 0;
		cursor: pointer;
		box-shadow: none;
		transition: all 160ms ease;
	}

	.close-button:hover {
		background: var(--primary-soft);
		color: var(--foreground);
		transform: none;
		box-shadow: none;
	}

	.close-icon {
		font-size: 1rem;
		line-height: 1;
	}
</style>
