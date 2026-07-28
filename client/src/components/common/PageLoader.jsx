import Logo from "@/assets/logo.svg";

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50">
      <div className="flex flex-col items-center">
        <img
          src={Logo}
          alt="Contri"
          className="h-20 w-auto"
        />

        <p className="mt-6 text-sm font-medium tracking-wide text-neutral-500">
          Loading...
        </p>
      </div>
    </div>
  );
}