"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultData = { name: "", email: "", password: "" };

const Register = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onRegister = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      toast.error("Please fill all the fields");
      return; // important: stop execution if fields are missing
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Account created successfully");
        router.push("/login");
        setData(defaultData); // clear form
      } else {
        const errorData = await res.json();
        toast.error(errorData?.error || "Failed to create account");
      }
    } catch (error) {
      console.error("error while creating account", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-md mx-auto mt-20 p-6  rounded-xl shadow-md border border-indigo-200">
        <h2 className="text-3xl font-semibold mb-6 text-center  text-indigo-600">
          Create Account
        </h2>

        <form method="POST" className="space-y-6 " onSubmit={onRegister}>
          <div className="flex flex-col ">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-indigo-400 "
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="john@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-indigo-400 "
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="********"
              className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-indigo-400 "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 text-white cursor-pointer rounded-md transition duration-200 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 hover:text-indigo-700">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
