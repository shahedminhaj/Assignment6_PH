import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types";

type Props = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: Props) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group bg-bg-card rounded-xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-black overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="text-[10px] tracking-widest uppercase font-bold text-black bg-accent px-2 py-0.5 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-bold uppercase text-white leading-tight line-clamp-2">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="text-xs text-gray-400 line-clamp-1">
          {workout.equipment}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs text-gray-300 mt-auto pt-3 border-t border-white/5">
          <span className="flex items-center gap-1">
            ⏱ {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            🔥 {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-accent">
            ⭐ {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}