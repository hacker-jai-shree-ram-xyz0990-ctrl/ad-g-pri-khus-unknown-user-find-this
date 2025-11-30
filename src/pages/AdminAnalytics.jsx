import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { apiUrl } from "../utils/api";

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${apiUrl}/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.data);
      } catch (error) {
        console.error("Analytics Fetch Failed", error);
      }
    };
    fetchAnalytics();
  }, []);

  if (!data) return <p className="text-center p-6">Loading analytics...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Applicants", value: data.totalApplicants },
          { label: "Paid Applicants", value: data.paidApplicants },
          { label: "Total Revenue (₹)", value: data.totalRevenue },
          { label: "Certificates Issued", value: data.certificateIssuedCount },
        ].map((item, i) => (
          <div key={i}
            className="bg-slate-900 text-white p-4 rounded-lg shadow-md text-center"
          >
            <p className="text-xs uppercase opacity-60">{item.label}</p>
            <p className="text-xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Trend */}
      <div className="bg-slate-900 p-5 rounded-lg shadow-md">
        <h3 className="text-white mb-3 font-semibold">
          Revenue & Payments By Month
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.paymentsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" name="Total Revenue" fill="#4CAF50" />
            <Bar dataKey="count" name="Payments Count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Domain-wise Applicants */}
      <div className="bg-slate-900 p-5 rounded-lg shadow-md">
        <h3 className="text-white mb-3 font-semibold">
          Applicants by Domain
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.applicantsByDomain}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#00bcd4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feedback + Payment Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-slate-900 p-5 rounded-lg shadow-md">
          <h3 className="text-white mb-3 font-semibold">
            Avg Internship Rating
          </h3>
          <p className="text-3xl text-white font-bold text-center">
            ⭐ {data.feedbackAvgRating.toFixed(2)}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-lg shadow-md">
          <h3 className="text-white mb-3 font-semibold">
            Applicants by Payment Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data.internsByStatus}
                nameKey="_id"
                dataKey="count"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminAnalytics;