import Link from "next/link";




export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white w-full p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-black">AI Video-to-Video Transformation Tool</h1>
      <p className="text-xl mb-8 text-center max-w-2xl text-black">
        Transform your videos using advanced AI technology. Upload a video and apply stunning transformations with just
        a few clicks.
      </p>
      <Link href="/transform">
      
        <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Start Transforming
        </button>
      </Link>
    </div>
  );
}
