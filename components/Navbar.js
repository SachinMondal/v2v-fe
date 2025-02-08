import Link from "next/link";
export default function Navbar() {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <a href="/" className="font-bold text-xl">Video Transformer</a>
          <div className="space-x-4">
          <Link href="transform" className="hover:underline">Transform</Link>
            <Link href="/history" className="hover:underline">History</Link>
          </div>
        </div>
      </nav>
    );
  }
  