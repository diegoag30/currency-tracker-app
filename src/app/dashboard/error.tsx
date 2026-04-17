"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
      <h2 className="text-xl font-semibold text-error">Something went wrong</h2>
      <p className="text-sm text-base-content/60">{error.message}</p>
      <button className="btn btn-sm btn-primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
