import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* FOOTER */}
        <footer className="bg-gray-200 border-t-2 border-black">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row md:flex-row sm:flex-row items-center justify-between py-4">
                <div className="flex items-center">
                <p className="text-black font-semibold footer-title">Wikilytics</p>
                </div>
                <div className="flex items-center space-x-4">
                <a href="https://wikipedia-backend-94sp.onrender.com/openapi.json" target='_blank' className="text-black hover:underline">API reference</a>
                <a href="/reach-us" className="text-black hover:underline">Reach Us</a>
                </div>
            </div>
            </div>
        </footer>   
    </div>
  );
}

export default Footer;