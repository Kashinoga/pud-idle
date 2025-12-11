import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'app-theme';

const getStoredTheme = (): Theme | null => {
	if (!browser) return null;
	const stored = localStorage.getItem(THEME_KEY);
	return stored === 'dark' || stored === 'light' ? stored : null;
};

const getSystemTheme = (): Theme => {
	if (!browser) return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getActiveTheme = (): Theme => {
	if (!browser) return 'light';
	return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme): void => {
	if (!browser) return;
	document.documentElement.dataset.theme = theme;
	document.documentElement.style.colorScheme = theme;
};

export const setTheme = (theme: Theme): Theme => {
	if (!browser) return theme;
	localStorage.setItem(THEME_KEY, theme);
	applyTheme(theme);
	return theme;
};

export const initTheme = (): Theme => {
	if (!browser) return 'light';
	const stored = getStoredTheme();
	const theme = stored ?? getSystemTheme();
	applyTheme(theme);
	return theme;
};

export const toggleTheme = (): Theme => {
	const next = getActiveTheme() === 'dark' ? 'light' : 'dark';
	return setTheme(next);
};

if (browser) {
	initTheme();
}
