import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaTicketAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    return (
        <nav className="navbar-glass">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 group"
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm"
                            style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                            <FaTicketAlt />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">
                            Event<span className="gradient-text">ora</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-slate-400 hover:text-white transition-colors duration-200 font-medium text-sm"
                            style={{ cursor: 'pointer' }}
                        >
                            Browse Events
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="text-slate-400 hover:text-white transition-colors duration-200 font-medium text-sm"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {user.role === 'admin' ? 'Admin Panel' : 'My Dashboard'}
                                </Link>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                        style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }}>
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-semibold px-4 py-2 rounded-lg text-slate-300 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-slate-400 hover:text-white transition-colors duration-200 font-medium text-sm"
                                    style={{ cursor: 'pointer' }}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all duration-200"
                                    style={{
                                        background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                                        boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg transition"
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div
                        className="md:hidden pb-4 animate-fade-in"
                        style={{
                            borderTop: '1px solid rgba(255,255,255,0.07)',
                            paddingTop: '1rem'
                        }}
                    >
                        <div className="flex flex-col gap-3">
                            <Link
                                to="/"
                                className="text-slate-300 hover:text-white py-2 font-medium"
                                onClick={() => setMenuOpen(false)}
                                style={{ cursor: 'pointer' }}
                            >
                                Browse Events
                            </Link>
                            {user ? (
                                <>
                                    <Link
                                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                        className="text-slate-300 hover:text-white py-2 font-medium"
                                        onClick={() => setMenuOpen(false)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="text-left text-red-400 hover:text-red-300 py-2 font-medium"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-slate-300 hover:text-white py-2 font-medium" onClick={() => setMenuOpen(false)} style={{ cursor: 'pointer' }}>Login</Link>
                                    <Link to="/register" className="text-white py-2 font-bold gradient-text" onClick={() => setMenuOpen(false)} style={{ cursor: 'pointer' }}>Sign Up Free</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;