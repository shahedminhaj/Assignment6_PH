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
  const [done, setDone] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

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
    (id: number) => plan.some((w) => w.id === id),
    [plan]
  );

  const isSaved = useCallback(
    (id: number) => saved.some((w) => w.id === id),
    [saved]
  );

  const isDone = useCallback(
    (id: number) => done.includes(id),
    [done]
  );

  const addToPlan = useCallback(
    (workout: Workout): boolean => {
      if (plan.length >= 5) return false;
      if (plan.some((w) => w.id === workout.id)) return false;
      setPlan((prev) => [...prev, workout]);
      return true;
    },
    [plan]
  );

  const removeFromPlan = useCallback((id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDone((prev) => prev.filter((d) => d !== id));
  }, []);

  const markAsDone = useCallback((id: number) => {
    setDone((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }, []);

  const saveForLater = useCallback(
    (workout: Workout) => {
      if (saved.some((w) => w.id === workout.id)) return;
      setSaved((prev) => [...prev, workout]);
    },
    [saved]
  );

  const removeSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
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
  if (!ctx) throw new Error("useFitLog must be used inside FitLogProvider");
  return ctx;
}