import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTicketAlt } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[75vh] flex flex-col items-center justify-center p-4">
            {/* Orbs */}
            <div className="orb" style={{ width: 350, height: 350, top: '5%', left: '10%', background: '#10b981', position: 'fixed', opacity: 0.15, animationDelay: '0s' }} />
            <div className="orb" style={{ width: 280, height: 280, bottom: '10%', right: '10%', background: '#7c3aed', position: 'fixed', opacity: 0.15, animationDelay: '3s' }} />

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                <div
                    className="p-10 rounded-3xl text-center"
                    style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(16,185,129,0.25)',
                        backdropFilter: 'blur(30px)',
                        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(16,185,129,0.1)'
                    }}
                >
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl animate-pulse-glow"
                            style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)', color: '#4ade80' }}>
                            <FaCheckCircle />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-white mb-3">Booking Confirmed!</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Your ticket has been booked successfully. A confirmation email has been sent to your registered email address.
                    </p>

                    <div className="space-y-3">
                        <Link
                            to="/dashboard"
                            className="flex items-center justify-center gap-2 w-full font-bold py-4 px-6 rounded-xl text-white transition-all duration-200"
                            style={{
                                background: 'linear-gradient(135deg, #059669, #10b981)',
                                boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTicketAlt /> View My Tickets
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center justify-center w-full font-semibold py-4 px-6 rounded-xl text-slate-300 hover:text-white transition-all duration-200"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                cursor: 'pointer'
                            }}
                        >
                            Discover More Events
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;