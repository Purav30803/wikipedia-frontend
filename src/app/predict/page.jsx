'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React, { useState } from 'react';
import api from '@/conf/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from '@/components/Loader';

const Predict = () => {
    const [search, setSearch] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);  

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await api.post('/wikipedia/search', { search });
            console.log(res.data);
            setPrediction(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 my-8 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 bg-white">
                <section className="w-full max-w-7xl mt-16 ring-2 p-6 sm:p-12 lg:p-16 rounded-md bg-gray-100">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black text-left">Predict Future Engagement</h1>
                    <p className="text-gray-600 mt-4 text-left">
                        Our models provide predictions for any Wikipedia article's future engagement.
                    </p>
                    <div className="w-full mt-8 flex flex-col sm:flex-row items-center">
                        <input
                            type="text"
                            placeholder="Enter Wikipedia Link"
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-2 bg-white rounded-lg px-4 py-3 w-full sm:w-[70%] border-black outline-none"
                        />
                       {loading ?
                       <div className='border-2 bg-gray-200 text-black hover:bg-gray-300 transition-colors border-black cursor-pointer rounded-lg px-6 py-3 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto'>

                       
                       <Loader /></div>: <button
                            className="border-2 bg-gray-200 text-black hover:bg-gray-300 transition-colors border-black cursor-pointer rounded-lg px-6 py-3 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto"
                            onClick={handleSubmit}
                        >
                            Predict
                        </button>}
                    </div>

                    {prediction && (
                        <div className='pb-8'>
                        <div className='py-8'>
                            <h1 className='font-bold text-3xl'>Result</h1>
                            <p className='mt-3'>
                                Our model predicts that the Wikipedia article {prediction.title} will have {prediction.search_results === "positive" ? "high" : "low"} engagement in the future.
                            </p>
                        </div>
                        <div className="mt-8 text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-8">
                            <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-black">{prediction.data.title}</h1>
                            <div className="mt-4 space-y-2 text-black">
                                <p>📝 Title Length: {prediction.data.title_length}</p>
                                <p>📄 Article Length: {prediction.data.article_length} characters</p>
                                <p>📂 Categories: {prediction.data.num_categories}</p>
                                <p>🔗 Links: {prediction.data.num_links}</p>
                                <p>📉 Zero Pageviews Days: {prediction.data.zero_pageviews_days}</p>
                                <p>✏️ Recent Edit Days: {prediction.data.recent_edit_days}</p>
                                <p>📊 Pageview Trend: {prediction.data.pageview_trend}</p>
                            </div>
                            </div>

                            {/* Pageviews Graph */}
                            <div className="w-full h-64">
                                <h2 className="text-lg font-semibold text-black mb-2">Last 10 Days' Pageviews</h2>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={prediction.data.pageviews?.map((pv, index) => ({ day: `Day ${index + 1}`, views: pv }))}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div></div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Predict;
