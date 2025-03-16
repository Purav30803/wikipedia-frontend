'use client';

import Link from 'next/link';
import { ChevronRight, BarChart2, TrendingUp, Calendar, GitCompare } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <div className="md:w-3/4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Wikilytics</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Predict engagement and discover trends in Wikipedia articles
            </p>
            <p className="text-lg opacity-90 mb-8">
              A powerful platform for predicting page views, edits, and activity metrics for any Wikipedia article. Explore trends, compare data, and gain insights — all without requiring a login.
            </p>
            <Link
              href="/predict"
              className="inline-flex items-center bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition-colors"
            >
              Try Prediction Tool <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  {getFeatureIcon(feature.title)}
                  <h3 className="text-xl font-semibold text-gray-800 ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 h-16">{feature.description}</p>
                <div className="flex justify-end">
                  <Link
                    href={feature.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {feature.buttonText} <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to explore Wikipedia data?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Get started today with our free tools and discover insights about any Wikipedia article.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/predict"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-8 py-3 transition-colors"
          >
            Try Prediction Tool
          </Link>
          <Link
            href="/home"
            className="bg-white hover:bg-gray-100 text-blue-600 font-medium rounded-lg px-8 py-3 border border-blue-200 transition-colors"
          >
            Explore Trends
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to get the appropriate icon based on feature title
function getFeatureIcon(title) {
  switch (title) {
    case 'Predict Future Engagement':
      return <BarChart2 className="h-6 w-6 text-blue-500" />;
    case 'Trending Articles':
      return <TrendingUp className="h-6 w-6 text-green-500" />;
    case 'On This Day':
      return <Calendar className="h-6 w-6 text-amber-500" />;
    case 'Compare Articles':
      return <GitCompare className="h-6 w-6 text-purple-500" />;
    default:
      return <ChevronRight className="h-6 w-6 text-blue-500" />;
  }
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