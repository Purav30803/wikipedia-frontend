'use client';

import React, { useState } from 'react';
import api from '@/conf/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { ArrowLeft, Search, AlertCircle, TrendingUp, Info, RefreshCw, ArrowRightLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const Compare = () => {
    const [searchOne, setSearchOne] = useState('');
    const [searchTwo, setSearchTwo] = useState('');
    const [predictionOne, setPredictionOne] = useState(null);
    const [predictionTwo, setPredictionTwo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPrediction = async (search, setPrediction) => {
        if (!search) {
            toast.error('Please enter a valid Wikipedia link');
            return false;
        }

        try {
            const res = await api.post('/wikipedia/search', { search });
            if (res?.data?.error) {
                setError(res.data.error);
                return false;
            }
            setPrediction(res.data);
            return true;
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
            console.error(error);
            return false;
        }
    };

    const handleCompare = async () => {
        setError(null);
        setLoading(true);
        
        const firstSuccess = await fetchPrediction(searchOne, setPredictionOne);
        const secondSuccess = await fetchPrediction(searchTwo, setPredictionTwo);
        
        if (!firstSuccess && !secondSuccess) {
            setError("Both article searches failed. Please check your inputs and try again.");
        } else if (!firstSuccess) {
            setError("Failed to fetch the first article. Please check your input and try again.");
        } else if (!secondSuccess) {
            setError("Failed to fetch the second article. Please check your input and try again.");
        }
        
        setLoading(false);
    };

    const handleSwap = () => {
        setSearchOne(searchTwo);
        setSearchTwo(searchOne);
        setPredictionOne(predictionTwo);
        setPredictionTwo(predictionOne);
    };

    const handleReset = () => {
        setSearchOne('');
        setSearchTwo('');
        setPredictionOne(null);
        setPredictionTwo(null);
        setError(null);
    };

    const getComparisonData = () => {
        if (!predictionOne || !predictionTwo) return [];
        
        return [
            { name: 'Title Length', article1: predictionOne.data.title_length, article2: predictionTwo.data.title_length },
            // { name: 'Article Length', article1: predictionOne.data.article_length, article2: predictionTwo.data.article_length },
            { name: 'Categories', article1: predictionOne.data.num_categories, article2: predictionTwo.data.num_categories },
            { name: 'Links', article1: predictionOne.data.num_links, article2: predictionTwo.data.num_links },
            { name: 'Zero Pageviews Days', article1: predictionOne.data.zero_pageviews_days, article2: predictionTwo.data.zero_pageviews_days },
            { name: 'Recent Edit Days', article1: predictionOne.data.recent_edit_days, article2: predictionTwo.data.recent_edit_days }
        ];
    };

    const getCombinedPageviewData = () => {
        if (!predictionOne?.data?.pageviews || !predictionTwo?.data?.pageviews) return [];
        
        return Array(10).fill().map((_, index) => ({
            day: `Day ${index + 1}`,
            [predictionOne.title]: predictionOne.data.pageviews[index] || 0,
            [predictionTwo.title]: predictionTwo.data.pageviews[index] || 0
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 text-white py-8 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">
                    <Link href="/" className="inline-flex items-center text-white mb-6 hover:underline">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">Wikipedia Engagement Comparison</h1>
                    <p className="text-lg opacity-90">Compare future engagement predictions for any two Wikipedia articles</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Compare Two Wikipedia Articles</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Article</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Paste Wikipedia URL or article title"
                                        value={searchOne}
                                        onChange={(e) => setSearchOne(e.target.value)}
                                        className="border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Second Article</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Paste Wikipedia URL or article title"
                                        value={searchTwo}
                                        onChange={(e) => setSearchTwo(e.target.value)}
                                        className="border border-gray-300 dark:border-gray-600 rounded-lg pl-10 pr-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                            <button
                                onClick={handleCompare}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg px-6 py-3 transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-500/50 min-w-24"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Comparing
                                    </div>
                                ) : "Compare Articles"}
                            </button>
                            
                            <button
                                onClick={handleSwap}
                                disabled={loading}
                                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg px-4 py-3 transition-colors disabled:opacity-50 flex items-center"
                            >
                                <ArrowRightLeft className="h-5 w-5 mr-2" />
                                Swap
                            </button>
                            
                            <button
                                onClick={handleReset}
                                disabled={loading}
                                className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg px-4 py-3 transition-colors disabled:opacity-50 flex items-center"
                            >
                                <RefreshCw className="h-5 w-5 mr-2" />
                                Reset
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

                    {(!error && predictionOne && predictionTwo) && (
                        <div className="mt-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Prediction Result Cards */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6">
                                    <div className="flex items-center">
                                        <TrendingUp className={`h-6 w-6 mr-3 ${predictionOne.search_results === "positive" ? "text-green-500 dark:text-green-400" : "text-amber-500 dark:text-amber-400"}`} />
                                        <h2 className="text-xl font-bold dark:text-gray-100">Article 1 Prediction</h2>
                                    </div>
                                    <h3 className="font-medium text-lg mt-3 dark:text-gray-200">{predictionOne.title}</h3>
                                    <p className="mt-2 dark:text-gray-300">
                                        Predicted to have 
                                        <span className={`font-bold ${predictionOne.search_results === "positive" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"} ml-1`}>
                                            {predictionOne.search_results === "positive" ? "High" : "Low"}
                                        </span> future engagement.
                                    </p>
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                        <p>Pageview Trend: {predictionOne.data.pageview_trend}</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-6">
                                    <div className="flex items-center">
                                        <TrendingUp className={`h-6 w-6 mr-3 ${predictionTwo.search_results === "positive" ? "text-green-500 dark:text-green-400" : "text-amber-500 dark:text-amber-400"}`} />
                                        <h2 className="text-xl font-bold dark:text-gray-100">Article 2 Prediction</h2>
                                    </div>
                                    <h3 className="font-medium text-lg mt-3 dark:text-gray-200">{predictionTwo.title}</h3>
                                    <p className="mt-2 dark:text-gray-300">
                                        Predicted to have 
                                        <span className={`font-bold ${predictionTwo.search_results === "positive" ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"} ml-1`}>
                                            {predictionTwo.search_results === "positive" ? "High" : "Low"}
                                        </span> future engagement.
                                    </p>
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                                        <p>Pageview Trend: {predictionTwo.data.pageview_trend}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Charts */}
                            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Article Metrics Comparison</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={getComparisonData()}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#718096" />
                                            <XAxis 
                                                dataKey="name" 
                                                tick={{ fontSize: 12 }} 
                                                stroke="#718096"
                                                angle={-45}
                                                textAnchor="end"
                                                height={70}
                                            />
                                            <YAxis tick={{ fontSize: 12 }} stroke="#718096" />
                                            <Tooltip 
                                                contentStyle={{ 
                                                    backgroundColor: 'white', 
                                                    border: '1px solid #f0f0f0',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                                    color: 'black'
                                                }}
                                            />
                                            <Legend 
                                                wrapperStyle={{ paddingTop: 10 }}
                                                payload={[
                                                    { value: predictionOne.title, type: 'rect', color: '#3b82f6' },
                                                    { value: predictionTwo.title, type: 'rect', color: '#10b981' }
                                                ]}
                                            />
                                            <Bar 
                                                dataKey="article1" 
                                                name={predictionOne.title} 
                                                fill="#3b82f6" 
                                            />
                                            <Bar 
                                                dataKey="article2" 
                                                name={predictionTwo.title} 
                                                fill="#10b981" 
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 shadow-sm">
    <h3 className="text-xl font-semibold mb-6 dark:text-gray-100">Recent Pageviews Comparison</h3>
    <div className="h-64">
        {predictionOne && predictionTwo && (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#718096" />
                    <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 12 }} 
                        stroke="#718096"
                        allowDuplicatedCategory={false}
                    />
                    <YAxis 
                        tick={{ fontSize: 12 }} 
                        stroke="#718096" 
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #f0f0f0',
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            color: 'black'
                        }}
                        formatter={(value) => [value, "Views"]}
                    />
                    <Legend />
                    <Line 
                        data={predictionOne.data.pageviews.map((value, index) => ({ day: `Day ${index + 1}`, views: value }))}
                        type="monotone" 
                        dataKey="views" 
                        name={predictionOne.title}
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        activeDot={{ fill: '#1d4ed8', r: 6 }}
                    />
                    <Line 
                        data={predictionTwo.data.pageviews.map((value, index) => ({ day: `Day ${index + 1}`, views: value }))}
                        type="monotone" 
                        dataKey="views" 
                        name={predictionTwo.title}
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                        activeDot={{ fill: '#059669', r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        )}
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        Pageview trends over the last 10 days
    </p>
</div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center dark:text-gray-100">
                                        <Info className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                                        {predictionOne.title}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Title Length</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionOne.data.title_length}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Article Length</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionOne.data.article_length.toLocaleString()} chars</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionOne.data.num_categories}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Links</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionOne.data.num_links}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Zero Pageviews Days</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionOne.data.zero_pageviews_days}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Recent Edit Days</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionOne.data.recent_edit_days}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center dark:text-gray-100">
                                        <Info className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
                                        {predictionTwo.title}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Title Length</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionTwo.data.title_length}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Article Length</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionTwo.data.article_length.toLocaleString()} chars</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionTwo.data.num_categories}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Links</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionTwo.data.num_links}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Zero Pageviews Days</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionTwo.data.zero_pageviews_days}</p>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Recent Edit Days</p>
                                            <p className="text-lg font-medium dark:text-gray-200">{predictionTwo.data.recent_edit_days}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Compare;