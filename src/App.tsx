import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QRUThemeProvider } from './context/themeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import MyPage from './pages/MyPage';
import NewCard from './pages/NewCard';
import About from './pages/About';
import Shuffle from './pages/Shuffle';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Router>
			<QRUThemeProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Auth />} />
						<Route path="/mypage" element={<MyPage />} />
						<Route path="/card" element={<NewCard />} />
						<Route path="/about" element={<About />} />
						<Route path="/shuffle" element={<Shuffle />} />

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Layout>
			</QRUThemeProvider>
		</Router>
	);
}

export default App;
