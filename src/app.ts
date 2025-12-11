import { writable } from 'svelte/store';

export const leftCollapsed = writable(false);
export const rightOpen = writable(false);

export function toggleLeft() {
	leftCollapsed.update((v) => !v);
}
export function toggleRight() {
	rightOpen.update((v) => !v);
}
export function closeRight() {
	rightOpen.set(false);
}