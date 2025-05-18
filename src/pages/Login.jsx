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
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Account created successfully! You can now login.');
        setIsLogin(true);
        return;
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
      <div className="login-left">
        <div className="hero-content">
          <h1>Create Without Limits</h1>
          <p className="tagline">
            Where imagination meets AI-powered creation.<br />
            Make anything you envision in minutes.
          </p>
          
          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years of innovation</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Creative possibilities</div>
            </div>
          </div>
          
          <div className="quote">
            "The only limit is your creativity"
            <div className="quote-author">— Our Community</div>
          </div>
        </div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="logo">LOGO</div>
          <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <p className="subtext">
            {isLogin ? 'Login to continue to your dashboard' : 'Get started with 250 free credits'}
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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

          {/* <button className="apple-button" disabled={loading}>
            <img src="/apple-icon.svg" alt="Apple" />
            Sign in with Apple
          </button>
          
          {isLogin && (
            <p className="forgot-password">
              <a href="/forgot-password">Forgot password?</a>
            </p>
          )} */}
          
          <p className="auth-toggle">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}>
              {isLogin ? 'Sign up for free' : 'Log in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}