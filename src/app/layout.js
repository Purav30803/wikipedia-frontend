// src/app/layout.js
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NextTopLoader from 'nextjs-toploader';
import CustomCursor from '@/components/CustomCursor'; // new

export const metadata = {
  title: 'Wikilytics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ponomar&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
          rel="stylesheet"
        />
        {/* favicon */}
        <link rel="icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" type="application/manifest+json" />
        <link rel="apple-touch-icon" href="/fav.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="antialiased custom-cursor">
        <Toaster />
        <NextTopLoader showSpinner={false} />
        <Navbar />
        <div className="pt-16">
          {/* <CustomCursor /> ⬅ Add this here */}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
