export default function Navbar() {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <a href="/" className="font-bold text-xl">Video Transformer</a>
          <div className="space-x-4">
          <a href="transform" className="hover:underline">Transform</a>
            <a href="/history" className="hover:underline">History</a>
          </div>
        </div>
      </nav>
    );
  }
  