import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup 
} from 'firebase/auth';
import { auth } from '../firebase';
import './Login.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Signup logic
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully! You can now login.');
        setIsLogin(true); // Switch back to login
        return; // Don't navigate since we're switching views
      }
      navigate('/dashboard');
    } catch (error) {
      setError(getFriendlyError(error.code));
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      setError(getFriendlyError(error.code));
    }
  };

  const getFriendlyError = (errorCode) => {
    switch(errorCode) {
      case 'auth/email-already-in-use':
        return 'Email already in use. Please login.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left"></div>

      <div className="login-container">
        <div className="login-card">
          <div className="logo">LOGO</div>
          <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <p className="subtext">
            {isLogin ? 'Please login to continue' : 'Get started with your account'}
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleAuth}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
            </div>
            
            {isLogin && (
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me logged in</label>
              </div>
            )}
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? '...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
          
          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>
          
          <button className="google-button" onClick={signInWithGoogle} disabled={loading}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Sign in with Google
          </button>
          
          <p className="auth-toggle">
            {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}>
              {isLogin ? 'Create one' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}