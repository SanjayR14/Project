"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface User {
  userId: string;
  email: string;
  name?: string;
  isVerified: boolean;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!data.success) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setUser(data.data);
      setLoading(false);
    };

    run();
  }, []);

  if (loading)
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F8F9FC" }}
      >
        <p className="text-lg" style={{ color: "#1D3557" }}>
          Loading...
        </p>
      </main>
    );

  return (
    <main
      className="min-h-screen p-6 flex items-center justify-center"
      style={{ backgroundColor: "#F8F9FC" }}
    >
      <Card className="w-full max-w-xl shadow-sm border rounded-xl bg-white p-0">
        <CardHeader>
          <h1
            className="text-3xl font-bold"
            style={{ color: "#1D3557" }}
          >
            Dashboard
          </h1>
          <p className="text-sm" style={{ color: "#555" }}>
            Your account overview
          </p>
        </CardHeader>

        <CardContent className="space-y-4 mt-2">
          <div className="p-4 border rounded-lg bg-[#F8F9FC]">
            <p className="text-lg font-semibold" style={{ color: "#1D3557" }}>
              Welcome, {user?.name || user?.email}
            </p>

            <p className="mt-2 text-sm" style={{ color: "#555" }}>
              <span className="font-medium">User ID:</span> {user?.userId}
            </p>

            <p className="mt-1 text-sm" style={{ color: "#555" }}>
              <span className="font-medium">Verified:</span>{" "}
              {user?.isVerified ? (
                <span style={{ color: "#1D8135" }}>Yes</span>
              ) : (
                <span style={{ color: "#C0392B" }}>No</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
