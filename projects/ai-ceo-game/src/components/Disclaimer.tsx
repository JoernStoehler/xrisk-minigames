interface DisclaimerProps {
  onClose: () => void;
}

export function Disclaimer({ onClose }: DisclaimerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#0d0d0d]">
              Legal Notice
            </h2>
            <button
              onClick={onClose}
              className="text-[#8e8ea0] hover:text-[#0d0d0d] transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm font-medium text-[#0d0d0d]">Disclaimer</h3>
            <p className="text-xs text-[#6e6e80] leading-relaxed">
              This is a work of fiction created for educational purposes. It is
              intended as commentary on AI safety and existential risk, presented
              as an interactive thought experiment.
            </p>
            <p className="text-xs text-[#6e6e80] leading-relaxed">
              All characters and events depicted are fictional. Company and
              product names (OpenAI, GPT, etc.) are trademarks of their
              respective owners and are used here solely for purposes of
              commentary and education under fair use.
            </p>
            <p className="text-xs text-[#6e6e80] leading-relaxed">
              This project is <strong>not affiliated with, endorsed by, or
              sponsored by OpenAI, Inc.</strong> or any other company mentioned.
              It does not represent the views or actions of any real company or
              individual.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-medium text-[#0d0d0d]">
              Impressum (Legal Notice per TMG §5)
            </h3>
            <div className="text-xs text-[#6e6e80] leading-relaxed space-y-1">
              <p>Jörn Stöhler</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:joern@stoehler.com"
                  className="underline hover:text-[#0d0d0d]"
                >
                  joern@stoehler.com
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-medium text-[#0d0d0d]">Privacy</h3>
            <p className="text-xs text-[#6e6e80] leading-relaxed">
              This site does not collect, store, or process any personal data.
              Game progress is stored locally in your browser (localStorage) and
              is never transmitted to any server.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
