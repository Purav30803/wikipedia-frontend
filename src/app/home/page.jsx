'use client';

import React, { useEffect, useState } from 'react';
import api from '@/conf/api';
import Link from 'next/link';
import { ArrowRight, Loader2, TrendingUp, Calendar } from 'lucide-react';

const Home = () => {
  const [onThisDay, setOnThisDay] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [onThisDayRes, trendingRes] = await Promise.all([
          api.get('/wikipedia/on-this-day'),
          api.get('/wikipedia/top-trending')
        ]);

        setOnThisDay(onThisDayRes.data);
        setTrending(trendingRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Wikipedia Insights</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">Discover historical events and predict article engagement</p>
          <Link href="/predict" className="inline-flex items-center bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Try Prediction Tool <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        ) : (
          <>
            {/* On This Day Section */}
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold dark:text-gray-100">On This Day</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {onThisDay.slice(0, 4).map((event, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl">
                    {event.image?.source && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image.source}
                          alt={event.displayTitle}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-3 w-full">
                          <span className="text-white font-bold">{event.year}</span>
                        </div>
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold line-clamp-2 dark:text-gray-100">{event.displayTitle}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mt-2 line-clamp-3 text-sm">{event.text}</p>
                      <Link 
                        href={event.url} 
                        target="_blank" 
                        className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Read more <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Trending Now Section */}
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold dark:text-gray-100">Trending Now</h2>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                  {trending.map((item, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full px-2 py-1">
                          #{item.rank}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{item.pageviews.toLocaleString()} views</span>
                      </div>
                      <h3 className="text-lg font-semibold truncate dark:text-gray-100">{item.title}</h3>
                      <Link 
                        href={item.article_url} 
                        target="_blank" 
                        className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        Read article <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;