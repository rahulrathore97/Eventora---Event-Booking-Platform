import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-4">
            {/* Orbs */}
            <div className="orb" style={{ width: 350, height: 350, top: '5%', right: '10%', background: '#ef4444', position: 'fixed', opacity: 0.12, animationDelay: '1s' }} />
            <div className="orb" style={{ width: 280, height: 280, bottom: '10%', left: '10%', background: '#7c3aed', position: 'fixed', opacity: 0.15, animationDelay: '4s' }} />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                <div
                    className="p-10 rounded-3xl text-center"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(239,68,68,0.25)',
                        backdropFilter: 'blur(30px)',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(239,68,68,0.08)'
                    }}
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                            style={{
                                background: 'rgba(239,68,68,0.12)',
                                border: '2px solid rgba(239,68,68,0.35)',
                                color: '#f87171',
                                animation: 'pulse-glow 2.5s ease-in-out infinite',
                                boxShadow: '0 0 30px rgba(239,68,68,0.2)'
                            }}>
                            <FaTimesCircle />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-white mb-3">Booking Failed</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        We couldn't process your booking. Please ensure your details are correct and try again.
                    </p>

                    <div className="space-y-3">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 w-full font-bold py-4 px-6 rounded-xl text-white transition-all duration-200"
                            style={{
                                background: 'linear-gradient(135deg, #dc2626, #ef4444)',
                                boxShadow: '0 4px 20px rgba(239,68,68,0.35)',
                                cursor: 'pointer'
                            }}
                        >
                            Return to Events
                        </Link>
                        <Link
                            to="/dashboard"
                            className="flex items-center justify-center w-full font-semibold py-4 px-6 rounded-xl text-slate-300 hover:text-white transition-all duration-200"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer'
                            }}
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailed;