import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeName, getTheme } from '../styles/theme';
const THEME_STORAGE_KEY = 'app_theme';

interface ThemeContextType {
	themeName: ThemeName;
	toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [themeName, setThemeName] = useState<ThemeName>('light');

	useEffect(() => {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
		if (savedTheme) {
			setThemeName(savedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = themeName === 'light' ? 'dark' : 'light';
		setThemeName(newTheme);
		localStorage.setItem(THEME_STORAGE_KEY, newTheme);
	};

	return (
		<ThemeContext.Provider value={{ themeName, toggleTheme }}>
			<StyledThemeProvider theme={getTheme(themeName)}>{children}</StyledThemeProvider>
		</ThemeContext.Provider>
	);
};
