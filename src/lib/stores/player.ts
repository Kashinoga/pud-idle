import { writable } from 'svelte/store';
import { activityLog } from './activityLog';

export type PlayerStats = {
	level: number;
	experience: number;
	experienceToNextLevel: number;
	health: number;
	maxHealth: number;
	stamina: number;
	maxStamina: number;
};

export type PlayerState = {
	stats: PlayerStats;
	totalExperienceGained: number;
};

const calculateExperienceToNextLevel = (level: number): number => {
	// Exponential curve: each level requires more XP
	return Math.floor(100 * Math.pow(1.15, level - 1));
};

const defaultPlayerState: PlayerState = {
	stats: {
		level: 1,
		experience: 0,
		experienceToNextLevel: calculateExperienceToNextLevel(1),
		health: 100,
		maxHealth: 100,
		stamina: 100,
		maxStamina: 100
	},
	totalExperienceGained: 0
};

function createPlayerStore() {
	const { subscribe, update } = writable<PlayerState>(defaultPlayerState);

	return {
		subscribe,
		addExperience: (amount: number) => {
			update((state) => {
				let newExp = state.stats.experience + amount;
				let newLevel = state.stats.level;
				let leveledUp = false;

				// Check for level ups
				while (newExp >= state.stats.experienceToNextLevel) {
					newExp -= state.stats.experienceToNextLevel;
					newLevel += 1;
					leveledUp = true;
				}

				// Log level up event
				if (leveledUp) {
					activityLog.addEvent(
						'levelup',
						`Level up! Now level ${newLevel}`,
						'⭐',
						'var(--accent)'
					);
				}

				return {
					...state,
					stats: {
						...state.stats,
						level: newLevel,
						experience: newExp,
						experienceToNextLevel: calculateExperienceToNextLevel(newLevel),
						health: Math.min(state.stats.health + (leveledUp ? 10 : 0), 100 + newLevel * 5),
						maxHealth: 100 + newLevel * 5,
						stamina: Math.min(
							state.stats.stamina + (leveledUp ? 10 : 0),
							100 + newLevel * 5
						),
						maxStamina: 100 + newLevel * 5
					},
					totalExperienceGained: state.totalExperienceGained + amount
				};
			});
		},
		resetPlayer: () => {
			return writable<PlayerState>(defaultPlayerState);
		},
		setLevel: (level: number) => {
			update((state) => ({
				...state,
				stats: {
					...state.stats,
					level,
					experienceToNextLevel: calculateExperienceToNextLevel(level),
					maxHealth: 100 + level * 5,
					maxStamina: 100 + level * 5,
					health: Math.min(state.stats.health, 100 + level * 5),
					stamina: Math.min(state.stats.stamina, 100 + level * 5)
				}
			}));
		},
		setExperience: (experience: number) => {
			update((state) => ({
				...state,
				stats: {
					...state.stats,
					experience
				}
			}));
		},
		setHealth: (health: number) => {
			update((state) => ({
				...state,
				stats: {
					...state.stats,
					health: Math.min(health, state.stats.maxHealth)
				}
			}));
		},
		setStamina: (stamina: number) => {
			update((state) => ({
				...state,
				stats: {
					...state.stats,
					stamina: Math.min(stamina, state.stats.maxStamina)
				}
			}));
		},
		setTotalXp: (totalXp: number) => {
			update((state) => ({
				...state,
				totalExperienceGained: totalXp
			}));
		}
	};
}

export const player = createPlayerStore();
