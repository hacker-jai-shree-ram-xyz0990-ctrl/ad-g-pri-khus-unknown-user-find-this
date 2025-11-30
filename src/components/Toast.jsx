const Toast = ({ message, type }) => {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999]
      px-4 py-2 rounded-lg shadow-md text-sm font-medium
      transition-all duration-300
      ${type === "success" ? "bg-green-100 text-green-700 border border-green-300" : ""}
      ${type === "error" ? "bg-red-100 text-red-700 border border-red-300" : ""}
      ${type === "warning" ? "bg-yellow-100 text-yellow-700 border border-yellow-300" : ""}
      `}
    >
      {message}
    </div>
  );
};

export default Toast;