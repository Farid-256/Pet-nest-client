import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-6">
            <div className="text-center max-w-xl">

                <h1 className="text-8xl font-bold text-orange-500 mb-4">
                    404
                </h1>

                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>

                <p className="text-gray-600 text-lg mb-8">
                    The page you are looking for does not exist or may have been moved.
                </p>

                <Link href="/">
                    <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-semibold transition">
                        Back to Home
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default NotFound;