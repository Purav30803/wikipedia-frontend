'use client';

import React, { useEffect, useState } from 'react';
import api from '@/conf/api';
import Link from 'next/link';
import { ArrowRight, Loader2, TrendingUp, Calendar, Shuffle, FileText, Eye, X, TreePalm, TreeDeciduous } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';


const Home = () => {
  const [onThisDay, setOnThisDay] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onThisDayLoading, setOnThisDayLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalError, setModalError] = useState(null);


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

  const handleViewStats = async (url) => {
    setModalLoading(true);
    setModalError(null);
    setModalOpen(true);

    try {
      const response = await api.post('/wikipedia/search', { search: url });
      setModalData(response.data);
    } catch (err) {
      setModalError('Failed to fetch stats.');
    } finally {
      setModalLoading(false);
    }
  };


  const changeOnThisDay = async () => {
    setOnThisDayLoading(true);
    try {

      const onThisDayRes = await api.get('/wikipedia/on-this-day');
      setOnThisDay(onThisDayRes.data);

    }
    catch (err) {
      setError(err.message);
    }
    finally {
      setOnThisDayLoading(false);
    }
  }


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
            {trending?.length != 10 && (
              <section>
                <div className="flex items-center mb-6">
                  <TrendingUp className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-2xl font-bold dark:text-gray-100">Trending Now</h2>
                </div>
                <div className="relative">
                  <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                    {trending?.map((item, index) => (
                      index !== 4 &&
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
                        <div className='flex justify-between items-center mt-4'>

                          <Link
                            href={item.article_url}
                            target="_blank"
                            className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            Read article <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleViewStats(item.article_url)}
                            className="mt-2 bg-blue-100 text-blue-800 inline-flex items-center ring ring-blue-500 ring-1 hover:bg-blue-400 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white rounded-md dark:bg-[rgba(0,0,0,0.2)] px-3 py-2 text-sm font-medium dark:text-blue-200"
                          >
                            View Stats
                          </button>
                        </div>

                      </div>

                    ))}
                  </div>
                </div>
              </section>
            )}
            {/* On This Day Section */}
            <section className="mt-16">
              <div className='flex w-full items-center justify-between'>
                <div className="flex items-center mb-6">
                  <Calendar className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-2xl font-bold dark:text-gray-100">On This Day</h2>
                </div>
                <button disabled={onThisDayLoading} className="flex items-center mb-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 px-5 py-2 shadow-sm" onClick={changeOnThisDay}>
                  <Shuffle className="h-4 w-4 mr-1.5 text-white" />
                  <span className="text-sm font-medium text-white">Shuffle</span>
                </button>
              </div>
              {onThisDayLoading ? <>
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-spin" />
                </div>
              </> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {onThisDay.slice(0, 4)?.map((event, index) => (
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
                        Read article <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>}
            </section>

            {/* Trending Now Section */}



          </>
        )}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-5xl shadow-xl p-4 sm:p-6 relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setModalData(null);
              }}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl dark:hover:text-white"
            >
              <X className="mt-1" />
            </button>

            {modalLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
              </div>
            ) : modalError ? (
              <p className="text-red-500 text-center">{modalError}</p>
            ) : modalData ? (
              <div className="rounded-lg space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FileText className="mr-2" size={24} />
                  {modalData?.data?.title}
                </h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Content Metrics */}
                  <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                      <FileText className="mr-2" size={16} />
                      <h3 className="font-semibold">Content Metrics</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p className="flex justify-between">
                        <span>Title Length:</span>
                        <span className="font-medium">{modalData?.data?.title_length}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Article Length:</span>
                        <span className="font-medium">
                          {modalData?.data?.article_length?.toLocaleString()} chars
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Classification */}
                  <div className="bg-purple-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center text-purple-600 dark:text-purple-400 mb-2">
                      <TreeDeciduous className="mr-2" size={16} />
                      <h3 className="font-semibold">Classification</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p className="flex justify-between">
                        <span>Categories:</span>
                        <span className="font-medium">{modalData?.data.num_categories}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Links:</span>
                        <span className="font-medium">{modalData?.data.num_links}</span>
                      </p>
                    </div>
                  </div>

                  {/* Activity Stats */}
                  <div className="bg-amber-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center text-amber-600 dark:text-amber-400 mb-2">
                      <Calendar className="mr-2" size={16} />
                      <h3 className="font-semibold">Activity Stats</h3>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <p className="flex justify-between">
                        <span>Zero Pageview Days:</span>
                        <span className="font-medium">{modalData?.data?.zero_pageviews_days}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Recent Edit Days:</span>
                        <span className="font-medium">{modalData?.data?.recent_edit_days}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Graph */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 dark:text-gray-300 mb-4">
                    <Eye className="mr-2" size={18} />
                    <h3 className="font-semibold text-lg">Pageview Trends</h3>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={modalData.data.pageviews.map((v, i) => ({
                          day: `Day ${i + 1}`,
                          views: v,
                        }))}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis
                          dataKey="day"
                          tick={{ fill: '#6b7280' }}
                          axisLine={{ stroke: '#9ca3af' }}
                        />
                        <YAxis
                          tick={{ fill: '#6b7280' }}
                          axisLine={{ stroke: '#9ca3af' }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#f9fafb',
                            borderColor: '#e5e7eb',
                            borderRadius: '0.375rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Legend iconType="circle" />
                        <Line
                          type="monotone"
                          dataKey="views"
                          name="Page Views"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}


    </div>

  );
};

export default Home;