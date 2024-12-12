export type ThemeName = 'light' | 'dark';

export type ColorKey =
	| 'primary'
	| 'secondary'
	| 'third'
	| 'point'
	| 'background'
	| 'blur'
	| 'border'
	| 'text'
	| 'textBackground';
export type HeadingSize = 'large' | 'medium' | 'small';
export type ButtonSize = 'large' | 'medium' | 'small';
export type ButtonScheme = 'primary' | 'normal';
export type LayoutWidth = 'large' | 'medium' | 'small';
export type MediaQuery = 'mobile' | 'tablet' | 'desktop';
interface Theme {
	name: ThemeName;
	color: Record<ColorKey, string>;
	heading: {
		[key in HeadingSize]: {
			fontSize: string;
		};
	};
	button: {
		[key in ButtonSize]: {
			fontSize: string;
			padding: string;
		};
	};
	buttonScheme: {
		[key in ButtonScheme]: {
			color: string;
			backgroundColor: string;
		};
	};
	borderRadius: {
		default: string;
	};
	layout: {
		width: {
			[key in LayoutWidth]: string;
		};
	};
	mediaQuery: {
		[key in MediaQuery]: string;
	};
}

export const lightTheme: Theme = {
	name: 'dark',
	color: {
		primary: '#4db6ac',
		secondary: '#e0f7fa',
		third: '#a8edea',
		point: '#fed6e3',
		background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
		blur: 'rgba(255, 255, 255, 0.1)',
		text: '#213C48',
		textBackground: '#ffffff',
		border: '#f2f2f2',
	},
	heading: {
		large: {
			fontSize: '2rem',
		},
		medium: {
			fontSize: '1.5rem',
		},
		small: {
			fontSize: '1rem',
		},
	},
	button: {
		large: {
			fontSize: '1.5rem',
			padding: '1rem 2rem',
		},
		medium: {
			fontSize: '1rem',
			padding: '0.5rem 1rem',
		},
		small: {
			fontSize: '0.75rem',
			padding: '0.25rem 0.5rem',
		},
	},
	buttonScheme: {
		primary: {
			color: '#ffffff',
			backgroundColor: '#4db6ac',
		},
		normal: {
			color: '#ffffff',
			backgroundColor: '#a8edea',
		},
	},
	borderRadius: {
		default: '0.8rem',
	},
	layout: {
		width: {
			large: '1020px',
			medium: '760px',
			small: '320px',
		},
	},
	mediaQuery: {
		mobile: '(max-width: 768px)', // 768px 이하 에서 동작
		tablet: '(max-width: 1024px)', // 1024 px 이하에서 동작
		desktop: '(min-width: 1025px)', // 1025px 이상에서 동작
	},
};

export const darkTheme: Theme = {
	...lightTheme,
	name: 'light',
	color: {
		primary: '#141414',
		secondary: '#e8e8e8',
		third: '#2b2b2b',
		point: '#4db6ac',
		background: 'linear-gradient(135deg, #3a5663, #65474c)',
		blur: 'rgba(1, 1, 1, 0.1)',
		text: '#f2f2f2',
		textBackground: '#2b2b2b',
		border: '#757575',
	},
	buttonScheme: {
		primary: {
			color: '#ffffff',
			backgroundColor: '#3a5663',
		},
		normal: {
			color: '#ffffff',
			backgroundColor: '#141414',
		},
	},
};

export const getTheme = (themeName: ThemeName): Theme => {
	return themeName === 'dark' ? darkTheme : lightTheme;
};
