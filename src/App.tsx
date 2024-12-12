import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { QRUThemeProvider } from './context/themeContext';

function App() {
	return (
		<>
			<QRUThemeProvider>
				<Layout>
					<Home />
				</Layout>
			</QRUThemeProvider>
		</>
	);
}

export default App;
