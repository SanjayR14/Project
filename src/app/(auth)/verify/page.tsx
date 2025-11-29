"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message);
        return;
      }
      alert("User verified successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4 border p-6 rounded-lg">
        <h1 className="text-xl font-semibold text-center">Verify User</h1>
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter userId (UUID)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>
    </main>
  );
}
