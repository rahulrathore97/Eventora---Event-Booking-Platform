import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt, FaArrowRight, FaBolt } from 'react-icons/fa';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400);
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        {
            icon: <FaBolt />,
            title: 'Instant Booking',
            desc: 'Reserve your spot in seconds with our lightning-fast booking system built for speed.',
            color: '#f59e0b',
            glow: 'rgba(245, 158, 11, 0.2)',
        },
        {
            icon: <FaTicketAlt />,
            title: 'Seamless Access',
            desc: 'Download tickets instantly or manage them right from your personal dashboard.',
            color: '#8b5cf6',
            glow: 'rgba(139, 92, 246, 0.2)',
        },
        {
            icon: <FaShieldAlt />,
            title: 'Secure Platform',
            desc: 'All transactions secured with cutting-edge encryption and 2FA OTP verification.',
            color: '#10b981',
            glow: 'rgba(16, 185, 129, 0.2)',
        },
    ];

    return (
        <div className="flex flex-col min-h-screen">

            {/* ─── HERO ─── */}
            <section className="relative rounded-3xl overflow-hidden mb-14 mt-2" style={{ minHeight: '520px' }}>

                {/* Background orbs */}
                <div className="orb" style={{ width: 400, height: 400, top: '-100px', left: '-80px', background: '#7c3aed', animationDelay: '0s' }} />
                <div className="orb" style={{ width: 350, height: 350, bottom: '-80px', right: '-60px', background: '#db2777', animationDelay: '2s' }} />
                <div className="orb" style={{ width: 280, height: 280, top: '30%', left: '40%', background: '#3b82f6', animationDelay: '4s' }} />

                {/* Background image overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop')",
                        opacity: 0.12
                    }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.4) 0%, rgba(10,10,15,0.95) 100%)' }} />

                {/* Hero content */}
                <div className="relative z-10 flex flex-col items-center text-center px-6 py-20 md:py-28">
                    <div
                        className="animate-fade-in-up mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                        style={{
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(139, 92, 246, 0.35)',
                            color: '#a78bfa'
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                        Welcome to Eventora
                    </div>

                    <h1
                        className="animate-fade-in-up stagger-1 text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 text-white"
                    >
                        Find Your Next<br />
                        <span className="gradient-text">Unforgettable</span> Experience
                    </h1>

                    <p className="animate-fade-in-up stagger-2 text-slate-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                        Discover the best tech conferences, music festivals, and workshops happening near you. Book your spot today.
                    </p>

                    {/* Search bar */}
                    <div className="animate-fade-in-up stagger-3 w-full max-w-2xl relative group">
                        <div className="absolute inset-0 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"
                            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(219,39,119,0.3))', filter: 'blur(12px)', zIndex: -1 }} />
                        <div className="relative flex items-center"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: '16px',
                                backdropFilter: 'blur(20px)'
                            }}>
                            <FaSearch className="absolute left-5 text-slate-500 text-lg group-focus-within:text-violet-400 transition-colors duration-200" />
                            <input
                                type="text"
                                placeholder="Search events by title, category..."
                                className="w-full pl-14 pr-6 py-5 bg-transparent text-white text-base outline-none rounded-2xl font-medium"
                                style={{ caretColor: '#a78bfa' }}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {features.map((f, i) => (
                    <div
                        key={i}
                        className={`glass-card p-8 flex flex-col items-center text-center animate-fade-in-up stagger-${i + 2}`}
                    >
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl mb-5"
                            style={{
                                background: f.glow,
                                border: `1px solid ${f.color}40`,
                                color: f.color,
                                boxShadow: `0 0 30px ${f.glow}`
                            }}
                        >
                            {f.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-3">{f.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </section>

            {/* ─── EVENTS HEADING ─── */}
            <div className="flex items-center justify-between mb-8 px-1">
                <div>
                    <h2 className="text-3xl font-extrabold text-white mb-1">Upcoming Events</h2>
                    <p className="text-slate-500 text-sm">{events.length} events available</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-violet-400 font-semibold">
                    <span>{events.length} results</span>
                </div>
            </div>

            {/* ─── EVENTS GRID ─── */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="event-card animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="skeleton h-48 w-full" />
                            <div className="p-6 space-y-3">
                                <div className="skeleton h-3 w-20 rounded-full" />
                                <div className="skeleton h-5 w-3/4 rounded" />
                                <div className="skeleton h-3 w-1/2 rounded" />
                                <div className="skeleton h-3 w-2/3 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="glass-card p-16 text-center animate-fade-in">
                    <div className="text-6xl mb-4">🎭</div>
                    <h3 className="text-xl font-bold text-white mb-2">No events found</h3>
                    <p className="text-slate-400">Try a different search term</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event, idx) => (
                        <div
                            key={event._id}
                            className="event-card animate-fade-in-up flex flex-col"
                            style={{ animationDelay: `${idx * 0.07}s` }}
                        >
                            {/* Image */}
                            <div className="h-48 overflow-hidden relative">
                                {event.image ? (
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-black uppercase tracking-widest"
                                        style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
                                        <span className="gradient-text">{event.category?.[0] || '🎫'}</span>
                                    </div>
                                )}
                                {/* Price badge */}
                                <div
                                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-black"
                                    style={{
                                        background: event.ticketPrice === 0
                                            ? 'rgba(16, 185, 129, 0.9)'
                                            : 'rgba(124, 58, 237, 0.9)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'white',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}
                                >
                                    {event.ticketPrice === 0 ? 'FREE' : `₹${event.ticketPrice}`}
                                </div>
                                {/* Category badge */}
                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300"
                                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
                                    {event.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h2 className="text-lg font-bold text-white mb-3 leading-tight">{event.title}</h2>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <FaCalendarAlt className="text-violet-400 shrink-0" />
                                        <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                        <FaMapMarkerAlt className="text-pink-400 shrink-0" />
                                        <span className="truncate">{event.location}</span>
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    {/* Seats progress */}
                                    <div className="mb-1 flex justify-between items-center">
                                        <span className="text-[11px] text-slate-500 font-medium">{event.availableSeats} / {event.totalSeats} seats left</span>
                                        <span className="text-[11px] font-bold" style={{
                                            color: event.availableSeats < 10 ? '#f87171' : '#4ade80'
                                        }}>
                                            {event.availableSeats < 10 ? 'Almost Full' : 'Available'}
                                        </span>
                                    </div>
                                    <div className="progress-bar-track mb-4">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}
                                        />
                                    </div>

                                    <Link
                                        to={`/events/${event._id}`}
                                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200 group"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(219,39,119,0.25))',
                                            border: '1px solid rgba(139,92,246,0.3)',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(219,39,119,0.5))';
                                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(219,39,119,0.25))';
                                            e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)';
                                        }}
                                    >
                                        View Details <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ─── FOOTER ─── */}
            <footer className="mt-20 pt-12 pb-8 text-center" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex justify-center items-center gap-2.5 mb-4">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                        <FaTicketAlt />
                    </div>
                    <span className="text-lg font-black text-white">Event<span className="gradient-text">ora</span></span>
                </div>
                <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                    The most dynamic way to discover and host world-class events in your city.
                </p>
                <div className="text-xs text-slate-600 font-medium uppercase tracking-wider">
                    © {new Date().getFullYear()} Eventora Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;