'use client';
import SearchBar from "@/components/Search";
import api from "@/conf/api";
import { useState } from "react";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [response, setResponse] = useState("");
  const [error,setError] = useState("");

  const predict = async (value) => {
    try {
      const res = await api.post("/wikipedia/search", { search: value });
      setResponse(res);
      if(res?.data?.search_results !== "positive" || res?.data?.search_results !== "negative") {
        setError(res?.data?.error)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-6">
      <title>Wikipedia Engagement Prediction</title>
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-12">Wikipedia Engagement Prediction</h1>
        <SearchBar predict={predict} />
        <p className="mt-4 text-lg font-medium text-gray-700">
          {response && (response?.data?.search_results === "positive"
            ? "🚀 This might go high!"
            : response?.data?.search_results === "negative" ? "⚠️ It might not go high.":error || "SOMETHING WENT WRONG!")}
        </p>
      </div>
    </div>
  );
}