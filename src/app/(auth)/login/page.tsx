"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onChange =
    (field: "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#F8F9FC" }} // light grey-blue SaaS bg
    >
      <Card className="w-full max-w-md shadow-sm border rounded-xl bg-white">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-center"
            style={{ color: "#1D3557" }} // navy
          >
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center" style={{ color: "#555" }}>
            Login to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="email" style={{ color: "#1D3557" }}>
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={onChange("email")}
              className="h-11 text-black"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="password" style={{ color: "#1D3557" }}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={onChange("password")}
              className="h-11 text-black"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 text-base text-white"
            style={{
              backgroundColor: "#1D3557", // navy
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#15324a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1D3557")
            }
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center text-sm">
          <p className="text-[#555]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium"
              style={{ color: "#1D3557" }}
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
