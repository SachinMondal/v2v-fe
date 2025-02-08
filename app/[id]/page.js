"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/api/videos/${id}`);
        setVideo(res.data);
      } catch (error) {
        console.error("Error fetching video", error);
      }
    };
    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Transformed Video</h1>
      <video className="w-full max-w-lg" src={video.transformedUrl} controls />
    </div>
  );
}
