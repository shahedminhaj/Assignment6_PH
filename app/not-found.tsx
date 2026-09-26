import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <Image
          src="/assets/logo.png"
          alt="FitLog"
          width={60}
          height={60}
          className="mx-auto"
        />
      </div>

      <h1 className="font-display text-7xl md:text-9xl font-bold text-accent uppercase">
        404
      </h1>

      <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white mt-4">
        This lift doesn&apos;t exist.
      </h2>

      <p className="text-gray-400 mt-3 max-w-md">
        The page you&apos;re looking for has been reracked. Let&apos;s get you
        back to the workout library.
      </p>

      <Link
        href="/"
        className="btn bg-accent text-black font-bold border-none hover:bg-accent/90 mt-8"
      >
        ← Back to Workouts
      </Link>
    </main>
  );
}