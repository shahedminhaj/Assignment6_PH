"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFitLog } from "@/context/fitlog-context";
import { Workout } from "@/types";
import Toast from "@/components/ui/toast";

type TabType = "plan" | "saved";
type SortKey = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    done,
    removeFromPlan,
    removeSaved,
    markAsDone,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<TabType>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const baseList: Workout[] = activeTab === "plan" ? plan : saved;

  // Sort the list
  const activeList = useMemo(() => {
    const sorted = [...baseList];
    if (sortBy === "duration") {
      sorted.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "calories") {
      sorted.sort((a, b) => a.caloriesBurned - b.caloriesBurned);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [baseList, sortBy]);

  // Live metrics
  const metrics = useMemo(() => {
    const totalMinutes = plan.reduce((acc, w) => acc + w.duration, 0);
    const totalCalories = plan.reduce((acc, w) => acc + w.caloriesBurned, 0);
    return {
      exercises: plan.length,
      minutes: totalMinutes,
      calories: totalCalories,
    };
  }, [plan]);

  const handleRemove = (workout: Workout) => {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);
      setToast({ message: "Removed from today's plan", type: "success" });
    } else {
      removeSaved(workout.id);
      setToast({ message: "Removed from saved", type: "success" });
    }
  };

  const handleMarkDone = (workout: Workout) => {
    markAsDone(workout.id);
    const isNowDone = done.includes(workout.id);
    setToast({
      message: isNowDone ? "Marked as done" : "Marked as not done",
      type: "success",
    });
  };

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

      {/* Metrics */}
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

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-white/10 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "plan"
                ? "border-accent text-accent"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
              activeTab === "saved"
                ? "border-accent text-accent"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="bg-bg-card border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-accent cursor-pointer"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* List / Empty State */}
      {activeList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {activeList.map((workout) => (
            <WorkoutRow
              key={workout.id}
              workout={workout}
              isDone={done.includes(workout.id)}
              onMarkDone={() => handleMarkDone(workout)}
              onRemove={() => handleRemove(workout)}
            />
          ))}
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}

/* ---------- Empty State ---------- */
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

/* ---------- Workout Row ---------- */
type RowProps = {
  workout: Workout;
  isDone: boolean;
  onMarkDone: () => void;
  onRemove: () => void;
};

function WorkoutRow({ workout, isDone, onMarkDone, onRemove }: RowProps) {
  return (
    <div
      className={`bg-bg-card border rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-all ${
        isDone
          ? "border-accent/60 bg-accent/5"
          : "border-white/10"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full sm:w-24 h-40 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-black">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="96px"
          className={`object-cover transition-opacity ${
            isDone ? "opacity-50" : "opacity-100"
          }`}
        />
        {isDone && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-accent text-3xl font-bold">✓</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-display text-lg font-bold uppercase leading-tight ${
            isDone ? "text-gray-500 line-through" : "text-white"
          }`}
        >
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
      <div className="flex gap-2 w-full sm:w-auto items-center">
        <Link
          href={`/workout/${workout.id}`}
          className="btn btn-sm btn-outline text-white border-gray-600 hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        <button
          onClick={onMarkDone}
          className={`btn btn-sm border-none font-bold ${
            isDone
              ? "bg-gray-700 text-gray-300"
              : "bg-accent text-black hover:bg-accent/90"
          }`}
        >
          {isDone ? "✓ Done" : "Mark as Done"}
        </button>

        <button
          onClick={onRemove}
          aria-label="Remove"
          className="btn btn-sm btn-ghost text-gray-400 hover:text-red-400 hover:bg-red-500/10"
        >
          ✕
        </button>
      </div>
    </div>
  );
}