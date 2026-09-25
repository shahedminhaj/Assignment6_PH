"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getWorkoutById } from "@/lib/api";
import { Workout } from "@/types";
import { useFitLog } from "@/context/fitlog-context";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Toast from "@/components/ui/toast";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = String(params.id);

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const { addToPlan, saveForLater, isInPlan, isSaved, plan } = useFitLog();

  useEffect(() => {
    async function load() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (err) {
        setError("Failed to load workout.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-white">Workout Not Found</h1>
        <Link href="/" className="btn bg-accent text-black border-none">
          Back to Library
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const inSaved = isSaved(workout.id);

  const handleAddToPlan = () => {
    if (inPlan) {
      setToast({ message: "Already in today's plan", type: "error" });
      return;
    }
    if (plan.length >= 5) {
      setToast({ message: "Plan is full (max 5 lifts)", type: "error" });
      return;
    }
    addToPlan(workout);
    setToast({ message: "Added to today's plan", type: "success" });
  };

  const handleSaveForLater = () => {
    if (inSaved) {
      setToast({ message: "Already saved", type: "error" });
      return;
    }
    saveForLater(workout);
    setToast({ message: "Saved for later", type: "success" });
  };

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: `⭐ ${workout.rating}` },
  ];

  return (
    <main className="min-h-screen max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <button
        onClick={() => router.back()}
        className="text-gray-400 hover:text-accent mb-6 text-sm"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT: Image */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-bg-card border border-white/10">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* RIGHT: Details */}
        <div className="flex flex-col gap-6">
          {/* Category Tags */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((cat) => (
              <span
                key={cat}
                className="text-[10px] tracking-widest uppercase font-bold text-black bg-accent px-3 py-1 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl font-bold uppercase text-white leading-tight">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed">
            {workout.description}
          </p>

          {/* Key Specs Table */}
          <div className="bg-bg-card rounded-xl border border-white/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-white/10">
              <h2 className="font-display text-sm font-bold uppercase tracking-widest text-accent">
                Key Specs
              </h2>
            </div>
            <div className="divide-y divide-white/5">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between px-5 py-3 text-sm"
                >
                  <span className="text-gray-400 uppercase text-xs tracking-wider">
                    {spec.label}
                  </span>
                  <span className="text-white font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="font-display text-sm font-bold uppercase tracking-widest text-accent mb-4">
              Instructions
            </h2>
            <ol className="space-y-3">
              {workout.instructions.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToPlan}
              disabled={inPlan}
              className={`btn flex-1 border-none font-bold ${
                inPlan
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-accent text-black hover:bg-accent/90"
              }`}
            >
              {inPlan ? "✓ In Today's Plan" : "➕ Add to today's plan"}
            </button>
            <button
              onClick={handleSaveForLater}
              disabled={inSaved}
              className={`btn flex-1 font-bold ${
                inSaved
                  ? "bg-gray-700 text-gray-400 border-none cursor-not-allowed"
                  : "btn-outline text-white border-gray-600 hover:border-accent hover:text-accent"
              }`}
            >
              {inSaved ? "✓ Saved" : "🔖 Save for later"}
            </button>
          </div>
        </div>
      </div>

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