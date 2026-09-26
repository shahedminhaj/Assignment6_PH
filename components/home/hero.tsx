import Image from "next/image";

export default function Hero() {
  return (
    <section className="px-4 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto bg-bg-card rounded-3xl border border-white/5 overflow-hidden">
        <div className="px-8 lg:px-14 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT: Text */}
          <div className="space-y-6">
            <span className="inline-block text-xs tracking-widest text-accent uppercase font-bold">
              Workout Library
            </span>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase text-white">
              Train with intent. <br />
              <span className="text-accent">Log every set.</span>
            </h1>

            <p className="text-gray-400 text-base md:text-lg max-w-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="btn bg-accent text-black font-bold border-none hover:bg-accent/90 inline-flex items-center gap-2"
            >
              🏋️ Browse Workouts
            </a>
          </div>

          {/* RIGHT: Banner */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/assets/banner.png"
              alt="FitLog Hero"
              width={500}
              height={500}
              priority
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}