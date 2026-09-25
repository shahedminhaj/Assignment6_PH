export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <span className="loading loading-spinner loading-lg text-accent"></span>
      <p className="text-gray-400 text-sm">Loading workouts…</p>
    </div>
  );
}