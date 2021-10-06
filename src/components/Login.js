import React from 'react';
import './Login.css';
const Login = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSignIn,
  handleSignUp,
  hasAccount,
  setHasAccount,
  emailError,
  passwordError,
  username,
  setUsername,
}) => {
  return (
    <section className="login">
      <div className="login__container">
        {!hasAccount && (
          <input
            type="text"
            autoFocus
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        {/* <input
            type="text"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> */}
        <label>Email</label>
        <input
          type="text"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="error__message">{emailError}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error__message">{passwordError}</p>
        <div className="btn__container">
          {hasAccount ? (
            <>
              <button
                className="btn__signIn"
                onClick={handleSignIn}
                disabled={!password || !email}
              >
                Sign In
              </button>
              <p>
                Don't have an account?{' '}
                <span
                  className="btn__swap"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <button
                className="btn__signIn"
                onClick={handleSignUp}
                disabled={!username || !password || !email}
              >
                Sign Up
              </button>
              <p>
                Have an account?{' '}
                <span
                  className="btn__swap"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
