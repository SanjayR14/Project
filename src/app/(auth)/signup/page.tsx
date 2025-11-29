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

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange =
    (field: "name" | "email" | "password") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${form.token}`,
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Signup successful. You can now login.");
      window.location.href = "/login";
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
      style={{ backgroundColor: "#F8F9FC" }} // SaaS light background
    >
      <Card className="w-full max-w-md shadow-sm border rounded-xl bg-white">
        <CardHeader>
          <CardTitle
            className="text-2xl font-bold text-center"
            style={{ color: "#1D3557" }} // Navy
          >
            Create an Account
          </CardTitle>
          <CardDescription className="text-center" style={{ color: "#555" }}>
            Join the platform in seconds
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="name" style={{ color: "#1D3557" }}>
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={onChange("name")}
              className="h-11 text-black"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="password" style={{ color: "#1D3557" }}>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              value={form.password}
              onChange={onChange("password")}
              className="h-11 text-black"
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 text-base text-white"
            style={{
              backgroundColor: "#1D3557", // Navy
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#15324a")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1D3557")
            }
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center text-sm">
          <p className="text-[#555]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium"
              style={{ color: "#1D3557" }}
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
