export type ThemeName = 'light' | 'dark';

export type ColorKey = 'primary' | 'secondary' | 'background' | 'text' | 'border';

export interface Theme {
	name: ThemeName;
	color: Record<ColorKey, string>;
	borderRadius: string;
}

export const lightTheme: Theme = {
	name: 'light',
	color: {
		primary: '#4db6ac',
		secondary: '#e0f7fa',
		background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
		text: '#333333',
		border: '#bdbdbd',
	},
	borderRadius: '8px',
};

export const darkTheme: Theme = {
	name: 'dark',
	color: {
		primary: '#141414',
		secondary: '#4db6ac',
		background: 'linear-gradient(135deg, #3a5663, #65474c)',
		text: '#f5f5f5',
		border: '#757575',
	},
	borderRadius: '8px',
};

export const getTheme = (themeName: ThemeName): Theme => {
	return themeName === 'dark' ? darkTheme : lightTheme;
};
