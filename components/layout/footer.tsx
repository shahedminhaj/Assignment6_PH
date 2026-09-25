import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer bg-base-100 border-t border-white/10 px-4 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/logo.png"
          alt="FitLog Logo"
          width={24}
          height={24}
        />
        <span className="font-bold tracking-widest text-white">FITLOG</span>
      </div>

      <p className="text-gray-400 text-sm mt-2 sm:mt-0">
        © 2026 FitLog — Workout Library. Train hard, log honest.
      </p>
    </footer>
  );
}