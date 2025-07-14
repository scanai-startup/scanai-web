import { SignInForm } from "@/features/auth";

export default function Page() {
  return (
    <div className="relative h-[calc(100vh-80px)] w-full">
      <div className="absolute top-0 right-0 bottom-0 z-0 flex aspect-square w-full items-center justify-end bg-transparent mix-blend-screen md:w-[1000px]">
        <img
          src="/login-background.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-full object-cover object-right opacity-20 mix-blend-screen"
        />
      </div>
      <div className="bottom-0mx-auto absolute top-0 left-0 flex aspect-square h-full w-full max-w-5xl flex-row items-center justify-center gap-8 text-center">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-5xl font-bold">
            SCAN.<span className="text-[#ED2860]">AI</span>
          </div>
          <SignInForm className="min-w-sm" />
        </div>
      </div>
    </div>
  );
}
