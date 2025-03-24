// pages/index.tsx
import Head from "next/head";
import Sidebar from "../components/Sidebar";
// import MarketOverview from "@/components/MarketOverview";
// import Watchlist from "@/components/Watchlist";
// import PriceChart from "@/components/PriceChart";
import Stock from "@/components/Stock";
import Crypto from "@/components/Crypto";
import MarketNews from "@/components/MarketNews";
import Findash from "@/components/Findash";

export default function Home() {
  return (
    <>
      <Head>
        <title>Financial Dashboard</title>
      </Head>
      <div className="flex">
        <Sidebar />

        {/* Main content goes here */}
        <main className="flex-grow p-8">
              <h1 className="text-3xl font-bold">Financial Dashboard</h1>
              <p className="text-gray-600 ">Track stocks and cryptocurrencies in real-time.</p>

          <div>
            
              {/* <MarketOverview />
              <Watchlist />
              <PriceChart /> */}
              <Findash />
              <Stock />
              <Crypto />
              <MarketNews />
           
          </div>
              
        </main>
      </div>
    </>
  );
}
