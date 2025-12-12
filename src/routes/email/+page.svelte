<script lang="ts">
	type Email = {
		id: number;
		from: string;
		subject: string;
		preview: string;
		time: string;
		read: boolean;
	};

	let selectedEmailId = $state<number | null>(null);
	let emails = $state<Email[]>([
		{
			id: 1,
			from: 'Sarah Chen',
			subject: 'Q4 Project Status Update',
			preview: 'Hi team, I wanted to share the latest updates on our Q4 initiatives...',
			time: '10:30 AM',
			read: false
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

	const selectedEmail = $derived(emails.find((e) => e.id === selectedEmailId));
</script>

<svelte:head>
	<title>Email - Intergalactic Park Ranger</title>
</svelte:head>

<div class="email-container">
	<!-- Email List -->
	<div class="email-list">
		<div class="email-list-header">
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
	<div class="email-detail">
		{#if selectedEmail}
			<div class="email-detail-header">
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
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
					deserunt mollit anim id est laborum.
				</p>
				<p>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
					laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
					architecto beatae vitae dicta sunt explicabo.
				</p>
				<p>Best regards,<br />{selectedEmail.from}</p>
			</div>
			<div class="email-actions">
				<button class="primary-button">Reply</button>
				<button class="ghost-button">Forward</button>
				<button class="ghost-button">Archive</button>
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
		height: 100%;
		max-height: calc(100vh - var(--top-bar-height) * 2);
	}

	.email-list {
		display: flex;
		flex-direction: column;
		background: var(--surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--surface-border);
		box-shadow: var(--shadow-soft);
		backdrop-filter: blur(var(--blur));
		overflow: hidden;
	}

	.email-list-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--surface-border);
		background: var(--surface-strong);
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
		padding: 1rem 1.25rem;
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

	.email-item.selected {
		background: var(--primary-soft);
		border-left: 3px solid var(--primary);
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
		background: var(--surface);
		border-radius: var(--radius-lg);
		border: 1px solid var(--surface-border);
		box-shadow: var(--shadow-soft);
		backdrop-filter: blur(var(--blur));
		overflow: hidden;
	}

	.email-detail-header {
		padding: 1.25rem;
		border-bottom: 1px solid var(--surface-border);
		background: var(--surface-strong);
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
		padding: 1.25rem;
		overflow-y: auto;
		line-height: 1.6;
	}

	.email-body p {
		margin: 0 0 1rem 0;
	}

	.email-actions {
		display: flex;
		gap: 0.75rem;
		padding: 1rem 1.25rem;
		border-top: 1px solid var(--surface-border);
		background: var(--surface-strong);
	}

	.email-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		color: var(--muted);
		font-size: 1.1rem;
	}

	@media (min-width: 768px) {
		.email-container {
			grid-template-columns: 380px 1fr;
			max-height: calc(100vh - var(--top-bar-height));
		}
	}

	@media (min-width: 1024px) {
		.email-container {
			grid-template-columns: 420px 1fr;
		}
	}
</style>
