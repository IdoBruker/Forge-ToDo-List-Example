const LoadingIndicator = () => {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-2 pointer-events-none">
      <div className="backdrop-blur-sm bg-white/40 absolute inset-0" />
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500" />
      </div>
    </div>
  );
};

export default LoadingIndicator;
