"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/home/hero";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { getAllWorkouts } from "@/lib/api";
import { Workout } from "@/types";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />

      <section id="library" className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white">
            The Library
          </h2>
          <p className="text-gray-400 mt-2">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading && <LoadingSpinner />}

        {error && (
          <div className="text-center py-20 text-red-400">{error}</div>
        )}

        {!loading && !error && (
          <p className="text-gray-500">
            {workouts.length} workouts loaded. Cards coming in Commit 4.
          </p>
        )}
      </section>
    </main>
  );
}