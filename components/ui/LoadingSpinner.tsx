export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--paper)' }}>
      {/* Blob background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[70vw] h-[70vw] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pink-tint) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--sky-tint) 0%, transparent 70%)' }} />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        {/* Animated mascot badge */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl animate-bounce"
          style={{ background: 'radial-gradient(circle, var(--pink-tint) 0%, var(--sky-tint) 100%)' }}>
          🌸
        </div>

        <div className="text-center">
          <p className="font-display font-semibold text-lg" style={{ color: 'var(--ink)' }}>
            Creating your name...
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-2)' }}>
            This takes a few seconds ✨
          </p>
        </div>
      </div>
    </div>
  );
}
