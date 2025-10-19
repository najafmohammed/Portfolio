import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center py-20">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Project Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The project you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/works"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-medium transition-colors hover:bg-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Works
          </Link>
        </div>
      </div>
    </div>
  );
}
