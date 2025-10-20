const PageLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white/50">
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default PageLoader;
