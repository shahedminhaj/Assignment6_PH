"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useFitLog } from "@/context/fitlog-context";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="navbar bg-base-100 border-b border-white/10 px-4 lg:px-8 sticky top-0 z-50">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow-lg border border-white/10"
          >
            <li>
              <Link
                href="/"
                className={isActive("/") ? "text-accent font-bold" : ""}
              >
                Workouts
              </Link>
            </li>
            <li>
              <Link
                href="/my-plan"
                className={isActive("/my-plan") ? "text-accent font-bold" : ""}
              >
                My Plan
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="btn btn-ghost text-xl flex items-center gap-2 hover:bg-transparent px-2"
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

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-6">
          <li>
            <Link
              href="/"
              className={`text-sm uppercase tracking-widest font-semibold transition-colors ${
                isActive("/")
                  ? "text-accent"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Workouts
            </Link>
          </li>
          <li>
            <Link
              href="/my-plan"
              className={`text-sm uppercase tracking-widest font-semibold transition-colors ${
                isActive("/my-plan")
                  ? "text-accent"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end gap-2">
        <Link
          href="/my-plan"
          className="flex items-center gap-2 text-white font-bold text-xs md:text-sm px-3 py-3"
        >
          <span>Plan</span>
          <span className="bg-accent text-black rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            {plan.length}
          </span>
        </Link>

        <Link
          href="/my-plan"
          className="badge badge-lg badge-outline text-white border-gray-600 font-bold text-xs md:text-sm px-3 py-3 gap-2"
        >
          <span>Saved</span>
          <span className="bg-white/10 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
            {saved.length}
          </span>
        </Link>
      </div>
    </div>
  );
}