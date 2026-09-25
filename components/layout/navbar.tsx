"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-white/10 px-4 lg:px-8">
      {/* LEFT: Mobile Dropdown & Logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              aria-label="Menu"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/" className={isActive("/") ? "text-accent" : ""}>
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={isActive("/my-plan") ? "text-accent" : ""}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="btn btn-ghost text-xl flex items-center gap-2 hover:bg-transparent"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={28}
            height={28}
          />
          <span className="font-bold tracking-widest text-white">FITLOG</span>
        </Link>
      </div>

      {/* CENTER: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link
              href="/"
              className={
                isActive("/")
                  ? "text-accent font-bold"
                  : "text-gray-300 hover:text-white"
              }
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/my-plan"
              className={
                isActive("/my-plan")
                  ? "text-accent font-bold"
                  : "text-gray-300 hover:text-white"
              }
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT: Status Badges (Static for Commit 1) */}
      <div className="navbar-end gap-2">
        <Link
          href="/my-plan"
          className="badge badge-lg bg-accent text-black font-bold border-none"
        >
          Plan{" "}
          <span className="ml-1 bg-black text-accent rounded-full px-2 py-0.5 text-xs">
            0
          </span>
        </Link>
        <Link
          href="/my-plan"
          className="badge badge-lg badge-outline text-white border-gray-600"
        >
          Saved{" "}
          <span className="ml-1 bg-gray-800 rounded-full px-2 py-0.5 text-xs">
            0
          </span>
        </Link>
      </div>
    </div>
  );
}