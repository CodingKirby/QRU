import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './styles/global';

function App() {
	return (
		<>
			<GlobalStyle />
			<Layout>
				<Home />
			</Layout>
		</>
	);
}

export default App;
