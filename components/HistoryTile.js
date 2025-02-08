import Link from "next/link";

export default function HistoryTile({ id, sourceUrl, transformedUrl }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-black">ID: {id}</p>
      <p className="text-sm text-gray-600 break-all">
        Source:{" "}
        <Link href={sourceUrl} target="_blank" className="text-blue-500 hover:underline">
          {sourceUrl}
        </Link>
      </p>
      <p className="text-sm text-gray-600 break-all">
        Transformed:{" "}
        <Link href={transformedUrl} target="_blank" className="text-green-500 hover:underline">
          {transformedUrl}
        </Link>
      </p>
    </div>
  );
}
