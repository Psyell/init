import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; email: string; role: string }) => void;
}

type AuthMode = 'login' | 'register' | 'verify' | 'forgot';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [error, setError] = useState('');
  const { t, dir } = useLanguage();

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo login
    if (email === 'admin@noir.com' && password === 'admin123') {
      onLogin({ name: 'Admin User', email, role: 'admin' });
      onClose();
    } else if (email && password.length >= 6) {
      onLogin({ name: email.split('@')[0], email, role: 'user' });
      onClose();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setError('Please fill all fields');
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setMode('verify');
    alert(`Verification code: ${code}`);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === generatedCode) {
      onLogin({ name, email, role: 'user' });
      onClose();
    } else {
      setError('Invalid verification code');
    }
  };

  const handleGoogleLogin = () => {
    onLogin({ 
      name: 'Google User', 
      email: 'user@gmail.com', 
      role: 'user' 
    });
    onClose();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setVerificationCode('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir={dir}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-neutral-900 w-full max-w-md p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} text-white/50 hover:text-white`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl tracking-[0.2em] font-light text-center mb-8">
          {mode === 'login' && t('auth.login')}
          {mode === 'register' && t('auth.register')}
          {mode === 'verify' && t('auth.verifyCode')}
          {mode === 'forgot' && t('auth.forgotPassword')}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 text-sm p-3 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.email')}
                required
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('auth.password')}
                required
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50"
              />
            </div>
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-white/50 text-xs hover:text-white"
            >
              {t('auth.forgotPassword')}
            </button>
            <button
              type="submit"
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              {t('auth.login')}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-neutral-900 px-4 text-white/50">{t('auth.orContinueWith')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-white/20 text-white py-4 text-sm tracking-[0.1em] hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('auth.google')}
            </button>

            <p className="text-center text-white/50 text-sm mt-6">
              {t('auth.noAccount')}{' '}
              <button
                type="button"
                onClick={() => { resetForm(); setMode('register'); }}
                className="text-white hover:underline"
              >
                {t('auth.register')}
              </button>
            </p>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('auth.name')}
                required
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.email')}
                required
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              {t('auth.sendCode')}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-neutral-900 px-4 text-white/50">{t('auth.orContinueWith')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-white/20 text-white py-4 text-sm tracking-[0.1em] hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('auth.google')}
            </button>

            <p className="text-center text-white/50 text-sm mt-6">
              {t('auth.hasAccount')}{' '}
              <button
                type="button"
                onClick={() => { resetForm(); setMode('login'); }}
                className="text-white hover:underline"
              >
                {t('auth.login')}
              </button>
            </p>
          </form>
        )}

        {/* Verify Code Form */}
        {mode === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <p className="text-white/60 text-center text-sm mb-4">
              {t('auth.codeSent')} {email}
            </p>
            <div>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder={t('auth.enterCode')}
                maxLength={6}
                required
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm text-center tracking-[0.5em] focus:outline-none focus:border-white/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              {t('auth.verifyCode')}
            </button>
            <button
              type="button"
              onClick={handleSendCode}
              className="w-full text-white/50 text-sm hover:text-white"
            >
              {t('auth.resendCode')}
            </button>
          </form>
        )}

        {/* Forgot Password */}
        {mode === 'forgot' && (
          <form onSubmit={(e) => { e.preventDefault(); alert('Reset link sent!'); setMode('login'); }} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('auth.email')}
                required
                className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black py-4 text-sm tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              {t('auth.sendCode')}
            </button>
            <button
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-white/50 text-sm hover:text-white"
            >
              {t('auth.login')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
