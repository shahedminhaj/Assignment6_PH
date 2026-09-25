"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Workout, FitLogState } from "@/types";

const FitLogContext = createContext<FitLogState | null>(null);

const STORAGE_KEY = "fitlog-state";

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPlan(parsed.plan || []);
        setSaved(parsed.saved || []);
        setDone(parsed.done || []);
      }
    } catch (err) {
      console.error("Failed to load fitlog state:", err);
    }
    setHydrated(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved, done })
      );
    } catch (err) {
      console.error("Failed to save fitlog state:", err);
    }
  }, [plan, saved, done, hydrated]);

  const isInPlan = useCallback(
    (id: string | number) => plan.some((w) => String(w.id) === String(id)),
    [plan]
  );

  const isSaved = useCallback(
    (id: string | number) => saved.some((w) => String(w.id) === String(id)),
    [saved]
  );

  const isDone = useCallback(
    (id: string | number) => done.includes(String(id)),
    [done]
  );

  const addToPlan = useCallback(
    (workout: Workout): boolean => {
      if (plan.length >= 5) {
        return false; // Cap reached
      }
      if (plan.some((w) => String(w.id) === String(workout.id))) {
        return false; // Already in plan
      }
      setPlan((prev) => [...prev, workout]);
      return true;
    },
    [plan]
  );

  const removeFromPlan = useCallback((id: string | number) => {
    setPlan((prev) => prev.filter((w) => String(w.id) !== String(id)));
    setDone((prev) => prev.filter((d) => d !== String(id)));
  }, []);

  const markAsDone = useCallback((id: string | number) => {
    setDone((prev) =>
      prev.includes(String(id))
        ? prev.filter((d) => d !== String(id))
        : [...prev, String(id)]
    );
  }, []);

  const saveForLater = useCallback(
    (workout: Workout) => {
      if (saved.some((w) => String(w.id) === String(workout.id))) {
        return;
      }
      setSaved((prev) => [...prev, workout]);
    },
    [saved]
  );

  const removeSaved = useCallback((id: string | number) => {
    setSaved((prev) => prev.filter((w) => String(w.id) !== String(id)));
  }, []);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        done,
        addToPlan,
        removeFromPlan,
        markAsDone,
        saveForLater,
        removeSaved,
        isInPlan,
        isSaved,
        isDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }
  return ctx;
}