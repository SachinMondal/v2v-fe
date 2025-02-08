"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import HistoryTile from "@/components/HistoryTile";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/history`);
        console.log("History fetched", res.data);
        setHistory(res.data);
      } catch (error) {
        console.error("Error fetching history", error);
      }
    };
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Transformation History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {history? history.map((vid) => (
            <HistoryTile key={vid._id} id={vid._id} sourceUrl={vid.sourceUrl? vid.sourceUrl:""} transformedUrl={vid.transformedUrl? vid.transformedUrl:""} />
          )):
          <h1 className="text-white">
            No transformation history found. Please upload a video to see its transformation history.
            </h1>}
        </div>
      </div>
    </>
  );
}
