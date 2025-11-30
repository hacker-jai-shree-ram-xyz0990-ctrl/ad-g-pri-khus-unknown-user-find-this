const PreLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-[9998] backdrop-blur-sm">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default PreLoader;