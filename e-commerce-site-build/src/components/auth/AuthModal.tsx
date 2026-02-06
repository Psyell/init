import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useLanguage } from '@/i18n/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { email: string; name: string; role: string }) => void;
}

type AuthMode = 'login' | 'register' | 'otp' | 'forgot';

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [_otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  
  const { t, isRTL } = useLanguage();

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    if (!email) {
      setError(t.auth.enterEmail);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    
    console.log('📧 OTP sent to:', email, '- Code:', newOtp);
    alert(`${t.auth.otpSent} ${email}\n\n⚠️ Test code: ${newOtp}`);
    
    setOtpSent(true);
    setMode('otp');
    setIsLoading(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    
    if (enteredOtp.length !== 6) {
      setError(t.auth.enterOtp);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (enteredOtp === generatedOtp) {
      const user = {
        email,
        name: name || email.split('@')[0],
        role: 'customer'
      };
      
      localStorage.setItem('noir_user', JSON.stringify(user));
      onLogin(user);
      onClose();
      resetForm();
    } else {
      setError(t.auth.invalidOtp);
    }
    
    setIsLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@noir.com' && password === 'admin123') {
      const user = { email, name: 'Admin User', role: 'admin' };
      localStorage.setItem('noir_user', JSON.stringify(user));
      onLogin(user);
      onClose();
      resetForm();
    } else if (email && password.length >= 6) {
      const user = { email, name: email.split('@')[0], role: 'customer' };
      localStorage.setItem('noir_user', JSON.stringify(user));
      onLogin(user);
      onClose();
      resetForm();
    } else {
      setError(t.auth.invalidCredentials);
    }
    
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const googleUser = {
      email: 'user@gmail.com',
      name: 'Google User',
      role: 'customer'
    };
    
    localStorage.setItem('noir_user', JSON.stringify(googleUser));
    onLogin(googleUser);
    onClose();
    resetForm();
    setIsLoading(false);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setOtp(['', '', '', '', '', '']);
    setError('');
    setOtpSent(false);
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-zinc-900 border border-white/10 rounded-lg w-full max-w-md overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 text-white/60 hover:text-white transition-colors z-10",
            isRTL ? "left-4" : "right-4"
          )}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-0 text-center">
          <h2 className="text-white text-2xl tracking-[0.2em] font-light mb-2">INiT</h2>
          <p className="text-white/50 text-sm tracking-wider">
            {mode === 'login' && t.auth.loginTitle}
            {mode === 'register' && t.auth.registerTitle}
            {mode === 'otp' && t.auth.verifyTitle}
            {mode === 'forgot' && t.auth.forgotTitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs tracking-wider mb-2">{t.auth.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  placeholder="example@email.com"
                  dir="ltr"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/60 text-xs tracking-wider mb-2">{t.auth.password}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  placeholder="••••••••"
                  dir="ltr"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-white/40 text-xs hover:text-white transition-colors"
              >
                {t.auth.forgotPassword}
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full bg-white text-black py-3 text-sm tracking-[0.2em] rounded transition-colors",
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                )}
              >
                {isLoading ? t.auth.pleaseWait : t.auth.loginButton}
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 text-xs tracking-wider mb-2">{t.auth.fullName}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  placeholder={t.auth.fullName}
                />
              </div>
              
              <div>
                <label className="block text-white/60 text-xs tracking-wider mb-2">{t.auth.email}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={isLoading || !email}
                className={cn(
                  "w-full bg-white text-black py-3 text-sm tracking-[0.2em] rounded transition-colors",
                  isLoading || !email ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                )}
              >
                {isLoading ? t.auth.sending : t.auth.sendOtp}
              </button>
            </div>
          )}

          {/* OTP Verification */}
          {mode === 'otp' && (
            <div className="space-y-6">
              <p className="text-white/60 text-sm text-center">
                {t.auth.otpInstructions} <span className="text-white" dir="ltr">{email}</span>
              </p>
              
              <div className="flex justify-center gap-2" dir="ltr">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && index > 0) {
                        const prevInput = document.getElementById(`otp-${index - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    className="w-12 h-14 bg-black border border-white/20 text-white text-center text-xl focus:outline-none focus:border-white/40 rounded"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className={cn(
                  "w-full bg-white text-black py-3 text-sm tracking-[0.2em] rounded transition-colors",
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                )}
              >
                {isLoading ? t.auth.verifying : t.auth.verifyOtp}
              </button>

              <button
                onClick={handleSendOtp}
                className="w-full text-white/40 text-sm hover:text-white transition-colors"
              >
                {t.auth.resendOtp}
              </button>
            </div>
          )}

          {/* Forgot Password */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm text-center">
                {t.auth.enterEmail}
              </p>
              
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/20 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/40 rounded"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <button
                onClick={handleSendOtp}
                disabled={isLoading || !email}
                className={cn(
                  "w-full bg-white text-black py-3 text-sm tracking-[0.2em] rounded transition-colors",
                  isLoading || !email ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                )}
              >
                {isLoading ? t.auth.sending : t.auth.sendOtp}
              </button>
            </div>
          )}

          {/* Divider */}
          {(mode === 'login' || mode === 'register') && (
            <>
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-white/30 text-xs">{t.common.or}</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className={cn(
                  "w-full flex items-center justify-center gap-3 border border-white/20 text-white py-3 rounded transition-colors",
                  isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-white/5 hover:border-white/30"
                )}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm tracking-wider">
                  {isLoading ? t.auth.connecting : t.auth.loginWithGoogle}
                </span>
              </button>
            </>
          )}

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            {mode === 'login' && (
              <button
                onClick={() => setMode('register')}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {t.auth.noAccount} <span className="text-white">{t.auth.registerButton}</span>
              </button>
            )}
            {(mode === 'register' || mode === 'forgot') && (
              <button
                onClick={() => setMode('login')}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {t.auth.haveAccount} <span className="text-white">{t.auth.loginButton}</span>
              </button>
            )}
            {mode === 'otp' && (
              <button
                onClick={() => setMode('register')}
                className="text-white/60 text-sm hover:text-white transition-colors"
              >
                {t.auth.changeEmail}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
