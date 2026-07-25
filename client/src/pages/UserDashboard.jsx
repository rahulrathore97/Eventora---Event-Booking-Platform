import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt, FaTimesCircle, FaCalendarAlt, FaRupeeSign, FaRegClock } from 'react-icons/fa';

const statusConfig = {
    confirmed: { label: 'Confirmed', cls: 'badge-confirmed' },
    cancelled: { label: 'Cancelled', cls: 'badge-cancelled' },
    pending: { label: 'Pending', cls: 'badge-pending' },
};

const paymentConfig = {
    paid: { label: 'Paid', cls: 'badge-paid' },
    not_required: { label: 'Not Required', cls: 'badge-pending' },
    pending: { label: 'Payment Pending', cls: 'badge-pending' },
};

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching bookings', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (window.confirm('Cancel this booking request?')) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(error.response?.data?.message || 'Error cancelling booking');
            }
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto animate-fade-in">
                <div className="skeleton h-28 w-full rounded-2xl mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => <div key={i} className="skeleton h-56 rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in-up">

            {/* ─── Profile Banner ─── */}
            <div className="relative rounded-2xl overflow-hidden mb-8 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5"
                style={{
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(219,39,119,0.1) 100%)',
                    border: '1px solid rgba(139,92,246,0.25)',
                    backdropFilter: 'blur(20px)'
                }}>
                {/* Gradient orb */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 200, height: 200, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', filter: 'blur(50px)', pointerEvents: 'none' }} />

                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white shrink-0 relative z-10"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', boxShadow: '0 8px 25px rgba(124,58,237,0.4)' }}
                >
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col items-center sm:items-start relative z-10 text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                        Welcome back, <span className="gradient-text">{user?.name}</span>!
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        User Dashboard
                        <span className="text-slate-600">·</span>
                        <span>{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
            </div>

            {/* ─── Bookings Heading ─── */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                    style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}>
                    <FaTicketAlt />
                </div>
                <h2 className="text-xl font-bold text-white">My Booking Requests</h2>
            </div>

            {/* ─── Empty State ─── */}
            {bookings.length === 0 ? (
                <div className="glass-card p-16 text-center animate-fade-in">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl"
                        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
                        <FaTicketAlt />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No bookings yet</h3>
                    <p className="text-slate-400 mb-6 text-sm">You haven't booked any events. Start exploring!</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-white transition-all duration-200"
                        style={{
                            background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                            boxShadow: '0 4px 15px rgba(124,58,237,0.4)',
                            cursor: 'pointer'
                        }}
                    >
                        Browse Events →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {bookings.map((booking, idx) => (
                        <div
                            key={booking._id}
                            className="event-card flex flex-col animate-fade-in-up"
                            style={{ animationDelay: `${idx * 0.07}s` }}
                        >
                            {/* Card Header */}
                            <div className="p-5 flex-grow">
                                {booking.eventId ? (
                                    <>
                                        <div className="flex justify-between items-start mb-3 gap-2">
                                            <h3 className="text-base font-bold text-white leading-tight">{booking.eventId.title}</h3>
                                            <div className="flex flex-col gap-1 items-end shrink-0">
                                                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase tracking-wide ${statusConfig[booking.status]?.cls || 'badge-pending'}`}>
                                                    {statusConfig[booking.status]?.label || booking.status}
                                                </span>
                                                {booking.status !== 'cancelled' && (
                                                    <span className={`px-2 py-0.5 text-[10px] font-black rounded-full uppercase tracking-wide ${paymentConfig[booking.paymentStatus]?.cls || 'badge-pending'}`}>
                                                        {paymentConfig[booking.paymentStatus]?.label || booking.paymentStatus}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-violet-400 shrink-0 text-xs" />
                                                <span>{new Date(booking.eventId.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaRupeeSign className="text-pink-400 shrink-0 text-xs" />
                                                <span>{booking.amount === 0 ? 'Free' : `₹${booking.amount}`}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaRegClock className="text-amber-400 shrink-0 text-xs" />
                                                <span>Requested {new Date(booking.bookedAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-slate-500 italic text-sm">Event details unavailable</p>
                                )}
                            </div>

                            {/* Card Footer */}
                            <div className="px-5 py-3 flex justify-between items-center"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                {booking.eventId && booking.status !== 'cancelled' ? (
                                    <>
                                        <Link
                                            to={`/events/${booking.eventId._id}`}
                                            className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            View Event →
                                        </Link>
                                        <button
                                            onClick={() => cancelBooking(booking._id)}
                                            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-red-400 transition"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FaTimesCircle className="text-xs" /> Cancel
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-slate-500 text-sm italic w-full text-center">Booking Cancelled</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;