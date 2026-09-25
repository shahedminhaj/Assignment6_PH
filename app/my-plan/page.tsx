"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFitLog } from "@/context/fitlog-context";
import { Workout } from "@/types";

type TabType = "plan" | "saved";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();
  const [activeTab, setActiveTab] = useState<TabType>("plan");

  const activeList: Workout[] = activeTab === "plan" ? plan : saved;

  // Live Metrics from Today's Plan
  const metrics = useMemo(() => {
    const totalMinutes = plan.reduce((acc, w) => acc + w.duration, 0);
    const totalCalories = plan.reduce((acc, w) => acc + w.caloriesBurned, 0);
    return {
      exercises: plan.length,
      minutes: totalMinutes,
      calories: totalCalories,
    };
  }, [plan]);

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase text-white">
          My Plan
        </h1>
        <p className="text-gray-400 mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-card border border-white/10 rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
            Exercises
          </p>
          <p className="font-display text-3xl md:text-4xl font-bold text-accent">
            {metrics.exercises}
          </p>
        </div>
        <div className="bg-bg-card border border-white/10 rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
            Minutes
          </p>
          <p className="font-display text-3xl md:text-4xl font-bold text-white">
            {metrics.minutes}
          </p>
        </div>
        <div className="bg-bg-card border border-white/10 rounded-xl p-5">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
            Calories
          </p>
          <p className="font-display text-3xl md:text-4xl font-bold text-white">
            {metrics.calories}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10">
        <button
          onClick={() => setActiveTab("plan")}
          className={`px-4 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === "plan"
              ? "border-accent text-accent"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Today&apos;s Plan ({plan.length})
        </button>
        <button
          onClick={() => setActiveTab("saved")}
          className={`px-4 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
            activeTab === "saved"
              ? "border-accent text-accent"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          Saved ({saved.length})
        </button>
      </div>

      {/* List or Empty State */}
      {activeList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {activeList.map((workout) => (
            <WorkoutRow key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </main>
  );
}

/* Empty State Component */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">🏋️</div>
      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mb-2">
        Nothing here yet
      </h2>
      <p className="text-gray-400 mb-6 max-w-md">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="btn bg-accent text-black font-bold border-none hover:bg-accent/90"
      >
        Go to workouts
      </Link>
    </div>
  );
}

/* Workout Row Component */
function WorkoutRow({ workout }: { workout: Workout }) {
  return (
    <div className="bg-bg-card border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Thumbnail */}
      <div className="relative w-full sm:w-24 h-40 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold uppercase text-white leading-tight">
          {workout.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1">{workout.equipment}</p>
        <div className="flex items-center gap-4 text-xs text-gray-300 mt-3">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span className="text-accent">⭐ {workout.rating}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-full sm:w-auto">
        <Link
          href={`/workout/${workout.id}`}
          className="btn btn-sm btn-outline text-white border-gray-600 hover:border-accent hover:text-accent flex-1 sm:flex-none"
        >
          View Details
        </Link>
        <button className="btn btn-sm bg-accent text-black border-none font-bold flex-1 sm:flex-none">
          Mark as Done
        </button>
      </div>
    </div>
  );
}