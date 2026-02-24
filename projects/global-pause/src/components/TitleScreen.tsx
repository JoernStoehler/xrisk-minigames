interface TitleScreenProps {
  onStart: () => void;
}

export function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-wider text-isia-accent mb-2">
          THE PAUSE
        </h1>
        <div className="text-isia-muted text-sm uppercase tracking-widest">
          Director-General, ISIA
        </div>
      </div>

      <p className="text-isia-muted text-sm max-w-xs mb-12 leading-relaxed">
        Enforce the international ban on superintelligence development.
        Every decision has consequences. Keep the balance — or lose everything.
      </p>

      <button
        className="px-8 py-4 bg-isia-accent text-white rounded-lg font-bold uppercase tracking-wider text-sm active:bg-isia-accent/80 transition-colors min-h-[44px]"
        onClick={onStart}
      >
        Take Office
      </button>
    </div>
  );
}
