"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Sun,
  Moon,
  Facebook,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

/**
Footer Component

React + Tailwind CSS + shadcn/ui + lucide-react

Fully responsive

Light & Dark mode support (class strategy)

Functional newsletter subscribe (client-side, saves to localStorage)

Notes:
- dark mode now uses pure black background (dark:bg-black) and white text.
- default when no saved preference is Light (no system matchMedia).
*/

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);

  // Default to light when no saved preference
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      // default: Light (do not match system preference)
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("Failed to persist theme to localStorage:", err);
    }
  }, [isDark]);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setMsg({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    try {
      const key = "subscribed_emails";
      const raw = localStorage.getItem(key);
      const arr: string[] = raw ? JSON.parse(raw) : [];
      if (arr.includes(email.toLowerCase())) {
        setMsg({ type: "info", text: "You are already subscribed." });
      } else {
        arr.push(email.toLowerCase());
        localStorage.setItem(key, JSON.stringify(arr));
        setMsg({
          type: "success",
          text: "Subscribed! Check your inbox (simulated).",
        });
        setEmail("");
      }
    } catch {
      setMsg({ type: "error", text: "Subscription failed. Try again." });
    }
  };

  return (
    <>
      <footer className="bg-white text-gray-800 dark:bg-black dark:text-white border-t border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4">
          {/* Logo + short */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-md bg-gradient-to-br from-indigo-500 to-pink-500 p-2">
                <span className="sr-only">MyWebsite logo</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2L2 7v6c0 5 5 10 10 11s10-6 10-11V7L12 2z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  MyWebsite
                </h2>
                <p className="text-sm text-gray-600 dark:text-white">
                  Ship fast. Build beautiful interfaces. Delight users.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark((s) => !s)}
                aria-label="Toggle theme"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-900 bg-gray-50 dark:bg-black hover:shadow-sm"
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span className="text-sm">{isDark ? "Light" : "Dark"}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-white">
              <li>
                <a
                  href="/"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-white">
              <li>
                <a
                  href="/faq"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Subscribe
            </h3>
            <p className="text-sm text-gray-600 dark:text-white mb-3">
              Get product updates, articles, and resources.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2"
            >
              <Input
                type="email"
                aria-label="Email address"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 dark:bg-black border-gray-200 dark:border-gray-900"
                required
              />
              <Button type="submit" className="inline-flex items-center">
                <Mail className="w-4 h-4 mr-2" /> Subscribe
              </Button>
            </form>

            {msg && (
              <div
                role="status"
                className={`mt-3 text-sm ${
                  msg.type === "success"
                    ? "text-green-500"
                    : msg.type === "error"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {msg.text}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 hover:text-gray-900 dark:hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 dark:border-gray-900">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-white">
              © {new Date().getFullYear()} MyWebsite. All rights reserved.
            </p>
            <div className="text-sm text-gray-600 dark:text-white">
              Designed with ❤ • Built with Tailwind + shadcn
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
