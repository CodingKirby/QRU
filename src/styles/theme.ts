export type ThemeName = 'light' | 'dark';

export type ColorKey =
	| 'primary' // 주 색상
	| 'primaryVariant' // 주 색상 변형
	| 'secondary' // 보조 색상
	| 'secondaryVariant' // 보조 색상 변형
	| 'background' // 배경 색상
	| 'surface' // 표면 색상 ex) 카드, 버튼
	| 'error' // 오류 색상
	| 'onPrimary' // 주 색상 위의 텍스트 색상
	| 'onSecondary' // 보조 색상 위의 텍스트 색상
	| 'onBackground' // 배경 색상 위의 텍스트 색상
	| 'onSurface' // 표면 색상 위의 텍스트 색상
	| 'onError' // 오류 색상 위의 텍스트 색상
	| 'blur' // 흐린 색상
	| 'text' // 텍스트 색상
	| 'onText'; // 텍스트 위의 색상
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
		primaryVariant: '#00867d',
		secondary: '#e0f7fa',
		secondaryVariant: '#a8edea',
		background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
		surface: '#ffffff',
		error: '#b00020',
		onPrimary: '#ffffff',
		onSecondary: '#213C48',
		onBackground: '#000000',
		onSurface: '#000000',
		onError: '#ffffff',
		blur: 'rgba(255, 255, 255, 0.1)',
		text: '#213C48',
		onText: '#e0f7fa',
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
		primary: '#4db6ac',
		primaryVariant: '#2b2b2b',
		secondary: '#3a5663',
		secondaryVariant: '#2B3033',
		background: 'linear-gradient(135deg, #3a5663, #65474c)',
		surface: '#2b2b2b',
		error: '#cf6679',
		onPrimary: '#141414',
		onSecondary: '#ffffff',
		onBackground: '#ffffff',
		onSurface: '#ffffff',
		onError: '#ffffff',
		blur: 'rgba(1, 1, 1, 0.1)',
		text: '#e8e8e8',
		onText: '#000000',
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
