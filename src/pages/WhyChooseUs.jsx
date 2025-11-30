import { useEffect, useState } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { Edit, Trash2, Plus } from "lucide-react";

const WhyChooseUs = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    heading: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/whychooseus");
      setItems(res.data.data);
    } catch {
      showToast("Failed to load content!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editData) {
        await API.put(`/whychooseus/${editData._id}`, form);
        showToast("Updated successfully!", "success");
      } else {
        await API.post(`/whychooseus`, form);
        showToast("Item added!", "success");
      }

      setShowModal(false);
      setEditData(null);
      fetchData();
    } catch {
      showToast("Operation failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setForm({ heading: item.heading, description: item.description });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      await API.delete(`/whychooseus/${id}`);
      showToast("Deleted successfully!", "success");
      fetchData();
    } catch {
      showToast("Delete failed!", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Why Choose Us</h1>

            <button
              onClick={() => {
                setEditData(null);
                setForm({ heading: "", description: "" });
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm text-gray-800">
              <thead className="bg-gray-200 text-gray-600">
                <tr>
                  <th className="p-2 border">Heading</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No content found
                    </td>
                  </tr>
                )}

                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="p-2 border font-medium">{item.heading}</td>
                    <td className="p-2 border max-w-lg truncate">
                      {item.description}
                    </td>
                    <td className="p-2 border flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
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
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <form
            onSubmit={handleAddOrUpdate}
            className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
          >
            <h2 className="text-lg font-semibold">
              {editData ? "Edit Content" : "Add New"}
            </h2>

            <input
              type="text"
              name="heading"
              value={form.heading}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Heading"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded px-3 py-2"
              placeholder="Description"
              required
            />

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-3 py-1 bg-gray-300 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded-md"
              >
                {editData ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WhyChooseUs;