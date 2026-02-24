interface TitleScreenProps {
  onStart: () => void;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center bg-isia-bg">
      <div className="mb-8">
        <h1 className="text-5xl font-extrabold tracking-widest text-isia-accent mb-3">
          THE PAUSE
        </h1>
        <div className="w-16 h-1 bg-isia-accent mx-auto mb-4 rounded-full" />
        <div className="text-isia-muted text-sm font-semibold uppercase tracking-widest">
          Director-General, ISIA
        </div>
      </div>

      <p className="text-isia-muted text-sm max-w-xs mb-12 leading-relaxed">
        Enforce the international ban on superintelligence development.
        Every decision has consequences. Keep the balance — or lose everything.
      </p>

      <button
        className="px-8 py-4 bg-isia-accent text-white rounded-xl font-bold uppercase tracking-wider text-sm active:bg-isia-accent/80 transition-colors min-h-[44px] shadow-lg"
        onClick={onStart}
      >
        Take Office
      </button>
    </div>
  );
}
