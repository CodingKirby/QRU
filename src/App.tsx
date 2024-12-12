import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { ThemeProvider } from './context/themeContext';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
	return (
		<>
			<ThemeProvider>
				<GlobalStyle />
				<Layout>
					<Home />
				</Layout>
			</ThemeProvider>
		</>
	);
}

export default App;
