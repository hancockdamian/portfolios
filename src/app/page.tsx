import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link
        href="/damian"
        className="text-xl underline text-blue-600 hover:text-blue-800"
      >
        Go to Damian page
      </Link>
    </div>
  );
}