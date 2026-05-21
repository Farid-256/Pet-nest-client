const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">

            <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>

            <p className="text-gray-400 text-2xl font-medium">Loading...</p>

        </div>
    );
};

export default Loading;