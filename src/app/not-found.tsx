import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-6xl font-bold text-emerald-700">404</p>
      <h1 className="mt-4 text-2xl font-bold text-emerald-950">Page not found</h1>
      <p className="mt-2 text-emerald-900/70">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
