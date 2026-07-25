import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaChair, FaMoneyBillWave, FaArrowLeft, FaLock } from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) { navigate('/login'); return; }
        setBookingLoading(true);
        setError('');
        setSuccessMsg('');
        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg('OTP sent to your email. Please verify to confirm booking.');
            } else {
                await api.post('/bookings', { eventId: event._id, otp });
                setSuccessMsg('Booking requested! Awaiting admin confirmation.');
                setShowOTP(false);
                setEvent({ ...event, availableSeats: event.availableSeats - 1 });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
                <div className="skeleton h-80 w-full rounded-3xl mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div className="skeleton h-5 w-24 rounded-full" />
                        <div className="skeleton h-10 w-3/4 rounded" />
                        <div className="skeleton h-4 w-full rounded" />
                        <div className="skeleton h-4 w-5/6 rounded" />
                    </div>
                    <div className="skeleton h-80 rounded-2xl" />
                </div>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="text-center py-20">
                <div className="text-6xl mb-4">😕</div>
                <p className="text-xl text-red-400">{error || 'Event not found'}</p>
            </div>
        );
    }

    const isSoldOut = event.availableSeats <= 0;
    const seatsPercent = (event.availableSeats / event.totalSeats) * 100;

    const detailItems = [
        { icon: <FaMoneyBillWave />, label: 'Ticket Price', value: event.ticketPrice === 0 ? <span style={{ color: '#4ade80' }}>Free</span> : `₹${event.ticketPrice}`, color: '#f59e0b' },
        { icon: <FaChair />, label: 'Availability', value: `${event.availableSeats} / ${event.totalSeats} seats`, color: event.availableSeats < 10 ? '#f87171' : '#4ade80' },
        { icon: <FaCalendarAlt />, label: 'Date', value: new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }), color: '#60a5fa' },
        { icon: <FaMapMarkerAlt />, label: 'Location', value: event.location, color: '#f472b6' },
    ];

    return (
        <div className="max-w-5xl mx-auto animate-fade-in-up">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 text-sm font-medium group"
                style={{ cursor: 'pointer' }}
            >
                <FaArrowLeft className="transition-transform group-hover:-translate-x-1 duration-200" />
                Back to Events
            </button>

            {/* Hero Image */}
            <div className="relative rounded-3xl overflow-hidden mb-8" style={{ height: '360px' }}>
                {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl font-black uppercase"
                        style={{ background: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #831843)' }}>
                        <span className="gradient-text">{event.category}</span>
                    </div>
                )}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)' }} />

                {/* Category badge */}
                <div className="absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                    style={{ background: 'rgba(124,58,237,0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(139,92,246,0.5)' }}>
                    {event.category}
                </div>

                {/* Price badge */}
                <div className="absolute top-5 right-5 px-4 py-1.5 rounded-full text-xs font-black"
                    style={{
                        background: event.ticketPrice === 0 ? 'rgba(16,185,129,0.85)' : 'rgba(124,58,237,0.85)',
                        backdropFilter: 'blur(10px)',
                        color: 'white',
                        border: '1px solid rgba(255,255,255,0.25)'
                    }}>
                    {event.ticketPrice === 0 ? 'FREE' : `₹${event.ticketPrice}`}
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h1 className="text-3xl md:text-4xl font-black text-white leading-tight">{event.title}</h1>
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left - Description */}
                <div className="md:col-span-2">
                    <div className="glass-card p-8 mb-6">
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 rounded-full inline-block" style={{ background: 'linear-gradient(180deg,#7c3aed,#db2777)' }} />
                            About This Event
                        </h2>
                        <p className="text-slate-300 leading-relaxed text-base">{event.description}</p>
                    </div>

                    {/* Detail items grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {detailItems.map((item, i) => (
                            <div key={i} className="glass-card p-5 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm"
                                    style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}30` }}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">{item.label}</p>
                                    <p className="font-bold text-white text-sm leading-snug">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Booking Panel */}
                <div className="md:col-span-1">
                    <div className="rounded-2xl p-6 sticky top-24"
                        style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)'
                        }}>
                        <h3 className="text-lg font-bold text-white mb-5">Reserve Your Spot</h3>

                        {/* Seats bar */}
                        <div className="mb-5">
                            <div className="flex justify-between text-xs mb-1.5">
                                <span className="text-slate-400">{event.availableSeats} seats left</span>
                                <span className="font-bold" style={{ color: seatsPercent < 20 ? '#f87171' : '#4ade80' }}>
                                    {seatsPercent < 20 ? 'Almost Full!' : 'Available'}
                                </span>
                            </div>
                            <div className="progress-bar-track">
                                <div className="progress-bar-fill" style={{ width: `${seatsPercent}%` }} />
                            </div>
                        </div>

                        {/* OTP input */}
                        {showOTP && (
                            <div className="mb-4 animate-fade-in">
                                <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-2">
                                    <FaLock className="text-violet-400 text-xs" /> Enter OTP to Confirm
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="6-digit code"
                                    className="input-dark text-center font-black text-xl"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                    style={{ caretColor: '#a78bfa', letterSpacing: '0.3em' }}
                                />
                            </div>
                        )}

                        {/* Messages */}
                        {error && (
                            <div className="mb-4 p-3 rounded-xl text-sm text-center animate-fade-in"
                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
                                {error}
                            </div>
                        )}
                        {successMsg && (
                            <div className="mb-4 p-3 rounded-xl text-sm text-center animate-fade-in"
                                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#4ade80' }}>
                                {successMsg}
                            </div>
                        )}

                        {/* Book button */}
                        <button
                            onClick={handleBooking}
                            disabled={isSoldOut || bookingLoading || (showOTP && !otp)}
                            className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300"
                            style={{
                                background: isSoldOut || (successMsg && !showOTP)
                                    ? 'rgba(100,100,120,0.3)'
                                    : 'linear-gradient(135deg, #7c3aed, #db2777)',
                                color: isSoldOut || (successMsg && !showOTP) ? '#64748b' : 'white',
                                boxShadow: isSoldOut || (successMsg && !showOTP)
                                    ? 'none'
                                    : '0 4px 20px rgba(124, 58, 237, 0.4)',
                                cursor: isSoldOut || (successMsg && !showOTP) || bookingLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {bookingLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" />
                                    </svg>
                                    Processing...
                                </span>
                            ) : showOTP ? 'Verify OTP & Confirm'
                                : successMsg && !showOTP ? '✓ Request Sent'
                                : isSoldOut ? 'Sold Out'
                                : 'Confirm Registration'}
                        </button>

                        {!user && (
                            <p className="text-center mt-3 text-xs text-slate-500">
                                <span className="text-violet-400 font-semibold">Login</span> required to book tickets
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;