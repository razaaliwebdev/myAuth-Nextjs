"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultData = { email: "", password: "" };

const Login = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill all the fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Login Successful");
        router.push("/profile");
        setData(defaultData);
      } else {
        const errorData = await res.json();
        toast.error(errorData?.error || "Failed to login");
      }
    } catch (error) {
      console.log("error while login", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md dark:bg-gray-900">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">
          Welcome Back
        </h2>

        <form className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="you@example.com"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="********"
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            onClick={onLogin}
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md transition duration-200 ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
