import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTicketAlt, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4">
            {/* Background orbs */}
            <div className="orb" style={{ width: 350, height: 350, top: '5%', right: '5%', background: '#7c3aed', animationDelay: '1s', position: 'fixed' }} />
            <div className="orb" style={{ width: 300, height: 300, bottom: '5%', left: '5%', background: '#db2777', animationDelay: '4s', position: 'fixed' }} />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
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
                            {showOTP ? 'Verify Your Email' : 'Create Account'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {showOTP ? 'Check your inbox for the OTP code' : 'Join Eventora and discover events'}
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-5 p-3.5 rounded-xl text-sm text-center animate-fade-in"
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.25)',
                                color: '#f87171'
                            }}>
                            {typeof error === 'string' ? error : 'Something went wrong. Please try again.'}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!showOTP ? (
                            <>
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Rahul Rathore"
                                            className="input-dark pl-11"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>

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
                                            placeholder="Min. 6 characters"
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
                                {/* OTP success notice */}
                                <div className="p-3.5 rounded-xl text-sm text-center mb-4 animate-fade-in"
                                    style={{
                                        background: 'rgba(16, 185, 129, 0.1)',
                                        border: '1px solid rgba(16, 185, 129, 0.25)',
                                        color: '#4ade80'
                                    }}>
                                    📧 OTP sent to <strong>{email}</strong>
                                </div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter 6-digit code"
                                    className="input-dark text-center text-2xl font-black"
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
                            className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all duration-300 mt-2"
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
                            ) : showOTP ? 'Verify & Complete' : 'Create Account'}
                        </button>
                    </form>

                    {!showOTP && (
                        <p className="text-center mt-6 text-slate-400 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-violet-400 hover:text-violet-300 transition" style={{ cursor: 'pointer' }}>
                                Sign in
                            </Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;