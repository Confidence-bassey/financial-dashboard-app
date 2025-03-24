import React, { useState, useEffect } from "react";
import axios from "axios";

type NewsItem = {
  title: string;
  source: { name: string };
  publishedAt: string;
  category: string; 
};

const MarketNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketNews = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
        const response = await axios.get(
          "https://newsapi.org/v2/everything",
          {
            params: {
              q: "market OR stock OR cryptocurrency OR finance", 
              sortBy: "publishedAt", 
              language: "en",
              apiKey: apiKey,
            },
          }
        );

        
        const newsData = response.data.articles.slice(0, 5).map((article: any) => ({
          title: article.title,
          source: { name: article.source.name },
          publishedAt: article.publishedAt,
          category: "Finance", 
        }));

        setNews(newsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching market news:", error);
      }
    };

    fetchMarketNews();
  }, []);

  return (
    <div className="p-6 bg-white border border-gray-300 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-2">Market News</h1>
      <h2 className="text-gray-600 mb-6">Latest financial news and updates</h2>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ul className="space-y-4">
          {news.map((item, index) => (
            <li key={index} className="border-b pb-4">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {item.source.name} &bull;{" "}
                {new Date(item.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                &bull;{" "}
                <span className="font-semibold text-gray-800">{item.category}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MarketNews;
