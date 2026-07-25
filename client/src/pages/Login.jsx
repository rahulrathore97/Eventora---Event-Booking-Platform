import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTicketAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                const data = await login(email, password);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            } else {
                const data = await verifyOTP(email, otp);
                if (data.role === 'admin') navigate('/admin');
                else navigate('/dashboard');
            }
        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError('Account not verified. A new OTP has been sent to your email.');
            } else {
                setError(err.message || err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            {/* Background orbs */}
            <div className="orb" style={{ width: 400, height: 400, top: '0', left: '10%', background: '#7c3aed', animationDelay: '0s', position: 'fixed' }} />
            <div className="orb" style={{ width: 300, height: 300, bottom: '10%', right: '10%', background: '#db2777', animationDelay: '3s', position: 'fixed' }} />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                {/* Card */}
                <div
                    className="p-8 sm:p-10 rounded-3xl"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(30px)',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
                    }}
                >
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl animate-pulse-glow"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                                <FaTicketAlt />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-white mb-1">
                            {showOTP ? 'Verify Your Account' : 'Welcome Back'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {showOTP ? 'Enter the OTP sent to your email' : 'Sign in to your Eventora account'}
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-3.5 rounded-xl text-sm text-center animate-fade-in"
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                color: '#f87171'
                            }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!showOTP ? (
                            <>
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                        <input
                                            type="email"
                                            required
                                            placeholder="you@example.com"
                                            className="input-dark pl-11"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            placeholder="••••••••"
                                            className="input-dark pl-11 pr-11"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Verification Code (OTP)</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter 6-digit code"
                                    className="input-dark text-center text-2xl font-black tracking-[0.5em]"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                    style={{ caretColor: '#a78bfa', letterSpacing: '0.4em' }}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-300 relative overflow-hidden"
                            style={{
                                background: loading
                                    ? 'rgba(124,58,237,0.4)'
                                    : 'linear-gradient(135deg, #7c3aed, #db2777)',
                                boxShadow: loading ? 'none' : '0 4px 20px rgba(124, 58, 237, 0.4)',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : showOTP ? 'Verify OTP & Log In' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-slate-400 text-sm">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-bold text-violet-400 hover:text-violet-300 transition" style={{ cursor: 'pointer' }}>
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;