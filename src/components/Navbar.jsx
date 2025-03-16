'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, BarChart2 } from 'lucide-react';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Get current path and set active tab
        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            
            if (currentPath === "/home") {
                setActiveTab("home");
            } else if (currentPath === "/predict") {
                setActiveTab("prediction");
            } else if (currentPath === "/compare") {
                setActiveTab("compare");
            } else if (currentPath === "/") {
                setActiveTab("");
            }

            // Add scroll event listener
            const handleScroll = () => {
                if (window.scrollY > 20) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleClick = (tab) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center" onClick={() => handleClick('home')}>
                            <BarChart2 className="h-8 w-8 text-blue-600 mr-2" />
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Wikilytics
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link 
                            href="/home" 
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                activeTab === "home" 
                                ? "bg-blue-50 text-blue-700" 
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => handleClick("home")}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/predict" 
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                activeTab === "prediction" 
                                ? "bg-blue-50 text-blue-700" 
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => handleClick("prediction")}
                        >
                            Prediction
                        </Link>
                        <Link 
                            href="/compare" 
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                activeTab === "compare" 
                                ? "bg-blue-50 text-blue-700" 
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => handleClick("compare")}
                        >
                            Compare
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link
                        href="/home"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeTab === "home"
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => handleClick("home")}
                    >
                        Home
                    </Link>
                    <Link
                        href="/predict"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeTab === "prediction"
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => handleClick("prediction")}
                    >
                        Prediction
                    </Link>
                    <Link
                        href="/compare"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            activeTab === "compare"
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => handleClick("compare")}
                    >
                        Compare
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;