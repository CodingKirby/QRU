import { useState } from 'react';
import { auth, provider } from '../services/firebase';
import { signInWithPopup, signOut, User } from 'firebase/auth';

const Auth = () => {
	const [user, setUser] = useState<User | null>(null);

	// Google 로그인
	const handleGoogleLogin = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			setUser(result.user);
			console.log('User info:', result.user);
		} catch (error) {
			if (error instanceof Error) {
				console.error('Google Login Error:', error.message);
				alert(`Login failed: ${error.message}`);
			} else {
				console.error('Unexpected error:', error);
			}
		}
	};

	// 로그아웃
	const handleLogout = async () => {
		try {
			await signOut(auth);
			setUser(null);
		} catch (error) {
			console.error('Logout Error:', error);
		}
	};

	return (
		<div>
			{user ? (
				<div>
					<h2>Welcome, {user.displayName}</h2>
					<p>Email: {user.email}</p>
					<img src={user.photoURL ?? ''} alt="Profile" />
					<br />
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<h2>Google 로그인</h2>
					<button onClick={handleGoogleLogin}>Google Login</button>
				</div>
			)}
		</div>
	);
};

export default Auth;
