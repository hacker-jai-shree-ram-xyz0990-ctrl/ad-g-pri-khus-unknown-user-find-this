import { useState, useEffect } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { Search, Trash2, MessageCircle } from "lucide-react";
import { formatIST } from "../utils/istTime";

const Feedback = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalPages, setTotalPages] = useState(1);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/feedback?page=${page}&limit=${limit}&search=${search}`
      );
      setFeedbacks(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch {
      showToast("Failed to load feedback!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback message?")) return;

    try {
      await API.delete(`/feedback/${id}`);
      showToast("Feedback deleted!", "success");
      fetchFeedback();
    } catch {
      showToast("Operation failed!", "error");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFeedback();
  };

  useEffect(() => {
    fetchFeedback();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            Feedback
          </h1>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
          >
            <input
              type="text"
              placeholder="Search feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <button className="text-blue-600 hover:text-blue-700">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Message</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length === 0 && !loading && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No feedback found
                    </td>
                  </tr>
                )}

                {feedbacks.map((fb) => (
                  <tr key={fb._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{fb.name}</td>
                    <td className="p-2 border">{fb.email}</td>
                    <td className="p-2 border">{fb.domain}</td>
                    <td className="p-2 border max-w-xs truncate">{fb.message}</td>
                    <td className="p-2 border">{formatIST(fb.createdAt)}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => handleDelete(fb._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 rounded-md text-sm bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
            >
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded-md text-sm bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;