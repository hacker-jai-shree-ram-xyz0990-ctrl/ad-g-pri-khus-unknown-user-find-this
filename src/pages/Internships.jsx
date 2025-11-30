// import { useEffect, useState } from "react";
// import API from "../api/adminApi";
// import AdminNavbar from "../components/AdminNavbar";
// import AdminSidebar from "../components/AdminSidebar";
// import PreLoader from "../components/PreLoader";
// import { useToast } from "../context/ToastContext";
// import { Search, Trash2, Edit, Plus } from "lucide-react";

// const Internships = () => {
//   const { showToast } = useToast();
//   const [loading, setLoading] = useState(true);
//   const [internships, setInternships] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   // Modal control
//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState(null);

//   // Form fields
//   const [form, setForm] = useState({
//     domain: "",
//     subDomain: "",
//     spots: "",
//     location: "",
//     status: "active",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const fetchInternships = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get(
//         `/internships?page=${page}&limit=${limit}&search=${search}`
//       );
//       setInternships(res.data.data);
//       setTotalPages(res.data.pagination.totalPages);
//     } catch {
//       showToast("Unable to load internships!", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     fetchInternships();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure to delete?")) return;
//     try {
//       await API.delete(`/internships/${id}`);
//       showToast("Internship deleted!", "success");
//       fetchInternships();
//     } catch {
//       showToast("Delete failed!", "error");
//     }
//   };

//   const handleAddOrUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (editData) {
//         await API.put(`/internships/${editData._id}`, form);
//         showToast("Internship Updated!", "success");
//       } else {
//         await API.post(`/internships`, form);
//         showToast("Internship Added!", "success");
//       }

//       setShowModal(false);
//       setEditData(null);
//       fetchInternships();
//     } catch {
//       showToast("Operation failed!", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditData(item);
//     setForm({
//       domain: item.domain,
//       subDomain: item.subDomain,
//       spots: item.spots,
//       location: item.location,
//       status: item.status,
//     });
//     setShowModal(true);
//   };

//   useEffect(() => {
//     fetchInternships();
//   }, [page]);

//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
//       {loading && <PreLoader />}
//       <AdminNavbar />
//       <div className="flex flex-1">
//         <AdminSidebar />

//         <main className="flex-1 p-6 space-y-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-xl font-bold">Internships</h1>

//             <button
//               onClick={() => {
//                 setEditData(null);
//                 setForm({
//                   domain: "",
//                   subDomain: "",
//                   spots: "",
//                   location: "",
//                   status: "active",
//                 });
//                 setShowModal(true);
//               }}
//               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
//             >
//               <Plus className="w-4 h-4" />
//               Add Internship
//             </button>
//           </div>

//           {/* Search */}
//           <form
//             onSubmit={handleSearch}
//             className="max-w-sm flex items-center gap-2 bg-white border rounded-md px-3 py-2"
//           >
//             <input
//               type="text"
//               placeholder="Search by domain or sub-domain..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="flex-1 text-sm outline-none"
//             />
//             <button className="text-blue-600 hover:text-blue-700">
//               <Search className="w-5 h-5" />
//             </button>
//           </form>

//           {/* Table */}
//           <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
//             <table className="w-full text-sm border-collapse">
//               <thead className="bg-gray-200 text-gray-700">
//                 <tr>
//                   <th className="p-2 border">Domain</th>
//                   <th className="p-2 border">Sub-domain</th>
//                   <th className="p-2 border">Spots</th>
//                   <th className="p-2 border">Location</th>
//                   <th className="p-2 border">Status</th>
//                   <th className="p-2 border">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {internships.length === 0 && !loading && (
//                   <tr>
//                     <td colSpan="6" className="text-center py-4">
//                       No internships found
//                     </td>
//                   </tr>
//                 )}

//                 {internships.map((item) => (
//                   <tr key={item._id} className="hover:bg-gray-50 border">
//                     <td className="p-2 border">{item.domain}</td>
//                     <td className="p-2 border">{item.subDomain}</td>
//                     <td className="p-2 border">{item.spots}</td>
//                     <td className="p-2 border">{item.location}</td>
//                     <td className="p-2 border font-medium">{item.status}</td>
//                     <td className="p-2 border flex justify-center gap-3">
//                       <button
//                         onClick={() => handleEdit(item)}
//                         className="text-blue-600 hover:text-blue-800"
//                       >
//                         <Edit className="w-5 h-5" />
//                       </button>

//                       <button
//                         onClick={() => handleDelete(item._id)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         <Trash2 className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-3 mt-3">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((prev) => prev - 1)}
//               className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
//             >
//               Prev
//             </button>

//             <span className="text-sm">
//               Page {page} of {totalPages}
//             </span>

//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage((prev) => prev + 1)}
//               className="px-3 py-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 rounded-md text-sm"
//             >
//               Next
//             </button>
//           </div>
//         </main>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//           <form
//             onSubmit={handleAddOrUpdate}
//             className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
//           >
//             <h2 className="text-lg font-bold mb-3">
//               {editData ? "Edit Internship" : "Add Internship"}
//             </h2>

//             <input
//               type="text"
//               name="domain"
//               value={form.domain}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 w-full"
//               placeholder="Domain (ex: Web Development)"
//               required
//             />

//             <input
//               type="text"
//               name="subDomain"
//               value={form.subDomain}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 w-full"
//               placeholder="Sub-domain (ex: MERN Stack)"
//               required
//             />

//             <input
//               type="text"
//               name="spots"
//               value={form.spots}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 w-full"
//               placeholder="Example: 10 spots left"
//               required
//             />

//             <input
//               type="text"
//               name="location"
//               value={form.location}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 w-full"
//               placeholder="Location (ex: Remote)"
//               required
//             />

//             <select
//               name="status"
//               value={form.status}
//               onChange={handleChange}
//               className="border rounded px-3 py-2 w-full"
//             >
//               <option value="active">Active</option>
//               <option value="completed">Completed</option>
//               <option value="closed">Closed</option>
//             </select>

//             <div className="flex justify-end gap-3 mt-4">
//               <button
//                 type="button"
//                 className="px-3 py-1 rounded-md bg-gray-300 hover:bg-gray-400"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {editData ? "Update" : "Create"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Internships;






import { useEffect, useState } from "react";
import API from "../api/adminApi";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import PreLoader from "../components/PreLoader";
import { useToast } from "../context/ToastContext";
import { Search, Trash2, Edit, Eye, Plus, X } from "lucide-react";

const formatDate = (d) =>
  d ? new Date(d).toLocaleString("en-IN") : "NA";

const Internships = () => {
  const { showToast } = useToast();

  const [loading, setLoading] = useState(true);
  const [internships, setInternships] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;
  const [totalPages, setTotalPages] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // view | edit | add
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    id: "",
    domain: "",
    subDomain: "",
    stipend: "",
    spots: "",
    location: "",
    image: "",
    image2: "",
    rating: "",
    description: "",
    skills: "",
  });

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/internships?page=${page}&limit=${limit}&search=${search}`
      );
      setInternships(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      showToast("Failed to load internships!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchInternships();
  };

  const openAdd = () => {
    setSelected(null);
    setModalMode("add");
    setForm({
      id: "",
      domain: "",
      subDomain: "",
      stipend: "",
      spots: "",
      location: "",
      image: "",
      image2: "",
      rating: "",
      description: "",
      skills: "",
    });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setSelected(item);
    setModalMode("edit");
    setForm({
      id: item.id,
      domain: item.domain,
      subDomain: item.subDomain,
      stipend: item.stipend,
      spots: item.spots,
      location: item.location,
      image: item.image,
      image2: item.image2,
      rating: item.rating,
      description: item.description,
      skills: item.skills?.join(", "),
    });
    setModalOpen(true);
  };

  const openView = (item) => {
    setSelected(item);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this internship?")) return;
    try {
      await API.delete(`/internships/${id}`);
      showToast("Internship deleted!", "success");
      fetchInternships();
    } catch {
      showToast("Delete failed!", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      };

      if (modalMode === "edit") {
        await API.put(`/internships/${selected._id}`, payload);
        showToast("Internship updated!", "success");
      } else {
        await API.post(`/internships`, payload);
        showToast("Internship added!", "success");
      }

      setModalOpen(false);
      fetchInternships();
    } catch {
      showToast("Failed to save internship!", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {loading && <PreLoader />}
      <AdminNavbar />
      <div className="flex flex-1">
        <AdminSidebar />

        <main className="flex-1 p-6 space-y-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Internships</h1>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" /> Add Internship
            </button>
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="max-w-sm flex gap-2 bg-white border px-3 py-2 rounded-md"
          >
            <input
              type="text"
              placeholder="Search by domain..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm outline-none"
            />
            <button className="text-blue-600">
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Table */}
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">Domain</th>
                  <th className="p-2 border">Sub-domain</th>
                  <th className="p-2 border">Stipend</th>
                  <th className="p-2 border">Spots</th>
                  <th className="p-2 border">Location</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {internships.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 border">
                    <td className="p-2 border">{item.domain}</td>
                    <td className="p-2 border">{item.subDomain}</td>
                    <td className="p-2 border">{item.stipend}</td>
                    <td className="p-2 border">{item.spots}</td>
                    <td className="p-2 border">{item.location}</td>
                    <td className="p-2 border flex justify-center gap-3">
                      <button
                        className="text-green-600"
                        onClick={() => openView(item)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="text-blue-600"
                        onClick={() => openEdit(item)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(item._id)}
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
          <div className="flex justify-center gap-3">
            <button
              disabled={page === 1}
              className="px-3 py-1 bg-gray-300 rounded-md disabled:bg-gray-200"
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-300 rounded-md disabled:bg-gray-200"
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-auto rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="font-bold text-lg uppercase">
                {modalMode === "add"
                  ? "Add Internship"
                  : modalMode === "edit"
                  ? "Edit Internship"
                  : "View Internship Details"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* VIEW MODE */}
            {modalMode === "view" && selected && (
              <div className="space-y-3 text-sm">
                <img
                  src={selected.image2 || selected.image}
                  alt="Banner"
                  className="w-full h-48 object-cover rounded-md"
                />
                <p><b>ID:</b> {selected.id}</p>
                <p><b>Domain:</b> {selected.domain}</p>
                <p><b>Sub-domain:</b> {selected.subDomain}</p>
                <p><b>Spots:</b> {selected.spots}</p>
                <p><b>Rating:</b> {selected.rating}</p>
                <p><b>Stipend:</b> {selected.stipend}</p>
                <p><b>Description:</b> {selected.description}</p>
                <p><b>Skills:</b> {selected.skills?.join(", ")}</p>
                <p><b>Created:</b> {formatDate(selected.createdAt)}</p>

                {/* Learning Path */}
                <div>
                  <b>Learning Path:</b>
                  {selected.learningPath?.map((w) => (
                    <div key={w._id} className="border p-2 rounded-md mt-2">
                      <b>Week {w.weekNumber}:</b> {w.title}
                    </div>
                  ))}
                </div>

                {/* Project Roadmap */}
                <div>
                  <b>Project Roadmap:</b>
                  {selected.projectRoadmap?.map((s) => (
                    <p key={s._id}>Step {s.stepNumber}: {s.title}</p>
                  ))}
                </div>

              </div>
            )}

            {/* EDIT / ADD MODE */}
            {(modalMode === "edit" || modalMode === "add") && (
              <form className="space-y-3" onSubmit={handleSubmit}>
                {Object.entries(form).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium capitalize mb-1">
                      {key}
                    </label>
                    <input
                      className="w-full border px-3 py-2 rounded-md text-sm"
                      name={key}
                      value={value}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      required={["id", "domain", "subDomain"].includes(key)}
                    />
                  </div>
                ))}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 rounded-md"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Internships;
