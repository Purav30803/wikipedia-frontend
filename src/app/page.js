'use client';

import Link from 'next/link';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <>
      <main className={`min-h-screen bg-white px-12 pt-16 lg:pt-0 md:pt-0 sm:pt-0 flex flex-col justify-center items-center md:px-32 sm:px-12 lg:px-32`}>
        <section className="w-full mt-16">
          <h1 className="text-4xl font-bold text-black">Welcome to Wikilytics</h1>
          <p className="text-gray-600 mt-4">
            Wikilytics is a platform for training and serving models to predict engagement with Wikipedia articles. This includes page views, edits, talk page activity, and more. We provide data, model templates, and other tools to help you get started. No login required.
          </p>
        </section>

        <section className="w-full mt-10 mb-12">
          <h2 className="text-lg font-semibold text-black text-left">What we offer?</h2>
          <div className="mt-4 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between items-center ring-2 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <div>
                  <h3 className="font-semibold text-black">{feature.title}</h3>
                  <p className="text-gray-600 text-sm pr-12">{feature.description}</p>
                </div>
                <Link
                  href={feature.link}
                  className="border mt-3 text-black hover:bg-white  border-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  {feature.buttonText}
                </Link>

              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

const features = [
  {
    title: 'Predict Future Engagement',
    description: 'Our models provide predictions for page views, edits, talk page activity, and more.',
    buttonText: 'Try Now',
    link: '/predict',
  },
  {
    title: 'Trending Articles',
    description: 'Stay updated with the latest trending articles on Wikipedia.',
    buttonText: 'Explore',
    link: '/home',
  },
  {
    title: 'On This Day',
    description: "Discover historical events and birthdays with our 'On This Day' feature.",
    buttonText: 'Explore',
    link: '/home',
  },
  {
    title: 'Compare Articles',
    description: 'Compare engagement metrics between different Wikipedia articles.',
    buttonText: 'Explore',
    link: '/compare',
  },
];

const footerLinks = [
  { label: 'Docs', href: '/docs' },
  { label: 'API reference', href: '/api' },
  { label: 'Community', href: '/community' },
  { label: 'Help', href: '/help' },
  { label: 'Status', href: '/status' },
];