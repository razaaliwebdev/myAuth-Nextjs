"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Logout Successful");
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
      <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
        Profile
      </h2>

      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-white">
          Welcome to your profile
        </h1>
      </div>

      <button
        onClick={handleLogout}
        disabled={loading}
        className={`mt-6 w-full py-2 px-4 rounded-md transition duration-200 ${
          loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
        } text-white`}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default Profile;
