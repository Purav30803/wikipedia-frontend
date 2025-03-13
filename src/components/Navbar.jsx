'use client';
import { CloseOutlined, FundOutlined, MenuOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    // get current path
   

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const currentPath = window.location.pathname;
    useEffect(() => {
        if(currentPath == "/home") {
            setActiveTab("home");
        } else if (currentPath == "/predict") {
            setActiveTab("prediction");
        } else if (currentPath == "/compare") {
            setActiveTab("compare");
        }
    }
    , [currentPath]);

    return (
        <>
            <nav className="bg-gray-200 fixed w-full border-b-2 border-black">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        {/* Mobile Menu Button */}
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center button rounded-md ml-3 p-2 outline-none ring-2 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded={isMobileMenuOpen ? "true" : "false"}
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMobileMenuOpen ? (
                                    <CloseOutlined className="text-black" />
                                ) : (
                                    <MenuOutlined className="text-black" />
                                )}
                            </button>
                        </div>

                        {/* Brand */}
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center gap-x-4">
                                <p className="text-xl font-bold text-black navbar-title">Wikilytics</p>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="hidden sm:block">
                                <div className="flex space-x-4">
                                    <a href="/home" className={`rounded-md text-[16px] px-3 py-2 text-sm hover:ring-2 hover:bg-[#fff] text-black transition-all duration-300 ease-in-out transform ${activeTab == "home" ? "ring-2 bg-[#fff]":""}`} onClick={()=>handleClick("home")}>
                                        Home 
                                    </a>
                                    <a href="/predict" className={`rounded-md text-[16px] px-3 py-2 text-sm hover:ring-2 hover:bg-[#fff] text-black transition-all duration-300 ease-in-out transform ${activeTab == "prediction" ? "ring-2 bg-[#fff]":""}`} onClick={()=>handleClick("prediction")}>
                                        Prediction
                                    </a>
                                    <a href="/compare" className={`rounded-md text-[16px] px-3 py-2 text-sm hover:ring-2 hover:bg-[#fff] text-black transition-all duration-300 ease-in-out transform ${activeTab == "compare" ? "ring-2 bg-[#fff]":""}`} onClick={()=>handleClick("compare")} >
                                        Compare
                                    </a>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <a
                            href="/home"
                            className="block rounded-md px-3 py-2 text-sm font-medium text-black"
                            aria-current="page"
                        >
                            Home
                        </a>
                        <a
                            href="/predict"
                            className="block rounded-md px-3 py-2 text-sm font-medium text-black"
                        >
                            Prediction
                        </a>
                        <a
                            href="/compare"
                            className="block rounded-md px-3 py-2 text-sm font-medium text-black"
                        >
                            Compare
                        </a>

                    </div>
                </div>
            </nav>


        </>
    );
}

export default Navbar;
