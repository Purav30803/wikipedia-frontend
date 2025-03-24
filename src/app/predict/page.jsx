'use client';

import React, { useState } from 'react';
import api from '@/conf/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { ArrowLeft, Search, AlertCircle, TrendingUp, Info, Calendar, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const Predict = () => {
    const [search, setSearch] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [engagementData, setEngagementData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);
        if (!search) {
            toast.error('Please enter a valid Wikipedia link');
            setLoading(false);
            return;
        }

        try {
            // Get prediction data
            const predictionRes = await api.post('/wikipedia/search', { search });
            if (predictionRes?.data?.error) {
                setError(predictionRes.data.error);
                setLoading(false);
                return;
            }
            setPrediction(predictionRes.data);

            // Get engagement chart data
            const engagementRes = await api.get(`/wikipedia/engagement-chart?wiki_url=${encodeURIComponent(search)}`);
            setEngagementData(engagementRes.data);
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            console.error(error);
        }
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // Format chart data for display and sort by date
    const formatChartData = () => {
        if (!engagementData) return [];

        const parseDate = (d) => new Date(d).getTime();

        const pastData = engagementData.past.map(item => ({
            date: item.date,
            views: item.views,
            short: false,
            timestamp: parseDate(item.date),
        }));

        const futureData = engagementData.future.map(item => ({
            date: item.date,
            views: item.views,
            short: true,
            timestamp: parseDate(item.date),
        }));

        return [...pastData, ...futureData].sort((a, b) => a.timestamp - b.timestamp);
    };

    const getFutureDotColor = () => {
        if (!engagementData || engagementData.future.length < 2) return '#10b981'; // default green
        const first = engagementData.future[0].views;
        const last = engagementData.future[engagementData.future.length - 1].views;
        return last >= first ? '#10b981' : '#ef4444'; // green or red
    };



    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-8 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <Link href="/home" className="inline-flex items-center text-white mb-6 hover:underline">
                        <ChevronLeft className="h-4 w-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Wikipedia Engagement Predictor</h1>
                    <p className="text-lg opacity-90">Predict future engagement for any Wikipedia article</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Enter Wikipedia Link</h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Paste Wikipedia URL or article title"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg px-6 py-3 transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-500/50 min-w-24"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Predicting
                                    </div>
                                ) : "Predict"}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
                            <div className="flex items-center">
                                <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                                <h3 className="font-semibold text-red-600 dark:text-red-400">Error</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mt-2">{error}</p>
                        </div>
                    )}

                    {(!error && prediction) && (
                        <div className="mt-8">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6 mb-8">
                                <div className="flex items-center">
                                    <TrendingUp className={`h-6 w-6 mr-3 ${prediction.search_results === "positive" ? "text-green-500 dark:text-green-400" : "text-amber-500 dark:text-amber-400"}`} />
                                    <h2 className="text-2xl font-bold dark:text-gray-100">Prediction Results</h2>
                                </div>
                                <p className="text-lg mt-3 dark:text-gray-200">
                                    Our model predicts that the Wikipedia article <span className="font-semibold">{prediction.title}</span> will have
                                    <span className={`font-bold ${prediction.search_results === "positive" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"} ml-1`}>
                                        {prediction.search_results === "positive" ? "High" : "Low"}
                                    </span> engagement in the future.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center dark:text-gray-100">
                                        <Info className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                        Article Statistics
                                    </h3>
                                    <h4 className="text-lg font-medium mb-4 dark:text-gray-200">{prediction.data.title}</h4>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Title Length</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.title_length}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Article Length</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.article_length.toLocaleString()} chars</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.num_categories}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Links</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.num_links}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Zero Pageviews Days</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.zero_pageviews_days}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Recent Edit Days</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.recent_edit_days}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md col-span-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Pageview Trend</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{prediction.data.pageview_trend}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center dark:text-gray-100">
                                        <Calendar className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                        Engagement Trends
                                    </h3>
                                    {engagementData && (
                                        <>
                                            <h4 className="text-lg font-medium mb-4 dark:text-gray-200">{engagementData.article}</h4>
                                            <div className="h-64">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        data={formatChartData()}
                                                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#718096" />
                                                        <XAxis
                                                            dataKey="date"
                                                            tick={{ fontSize: 12 }}
                                                            stroke="#718096"
                                                            angle={-30}
                                                            textAnchor="end"
                                                            height={50}
                                                        />
                                                        <YAxis
                                                            tick={{ fontSize: 12 }}
                                                            stroke="#718096"
                                                        />
                                                        <Tooltip
                                                            contentStyle={{
                                                                backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : 'white',
                                                                border: '1px solid #f0f0f0',
                                                                borderRadius: '4px',
                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                                color: document.documentElement.classList.contains('dark') ? 'white' : 'black'
                                                            }}
                                                            formatter={(value) => [value.toLocaleString(), "Views"]}
                                                            labelFormatter={(label) => `Date: ${label}`}
                                                        />
                                                        <Legend />
                                                        <ReferenceLine
                                                            x={engagementData.past[0]?.date}
                                                            stroke="#f59e0b"
                                                            strokeDasharray="3 3"
                                                            label={{ value: 'Today', position: 'top', fill: '#f59e0b' }}
                                                        />
                                                        <Line
                                                            type="monotone"
                                                            dataKey="views"
                                                            stroke="#3b82f6"
                                                            strokeWidth={2}
                                                            dot={(props) => {
                                                                const { cx, cy, payload } = props;
                                                                const futureColor = getFutureDotColor();
                                                                const fillColor = payload.short ? futureColor : '#3b82f6';
                                                                return (
                                                                    <circle
                                                                        cx={cx}
                                                                        cy={cy}
                                                                        r={4}
                                                                        fill={fillColor}
                                                                        strokeWidth={2}
                                                                    />
                                                                );
                                                            }}
                                                            activeDot={(props) => {
                                                                const { cx, cy, payload } = props;
                                                                const futureColor = getFutureDotColor();
                                                                const fillColor = payload.short ? futureColor : '#1d4ed8';
                                                                return (
                                                                    <circle
                                                                        cx={cx}
                                                                        cy={cy}
                                                                        r={6}
                                                                        fill={fillColor}
                                                                    />
                                                                );
                                                            }}
                                                            name="Page Views"
                                                        />

                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
                                                Past engagement and predicted future views
                                            </p>
                                            <div className="flex justify-between mt-3 text-sm">
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span> Past data: {engagementData.past.length} days
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-400">
                                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span> Future prediction: {engagementData.future.length} days
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Predict;