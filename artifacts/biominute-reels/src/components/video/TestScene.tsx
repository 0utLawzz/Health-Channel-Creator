// QA scene: renders at the exact 1080×1920 canvas to verify the safe zone, text
// scaling, and edge padding before any real episode is exported.

export function TestScene() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-navy text-brand-text overflow-hidden">
      {/* 8% safe-zone border */}
      <div
        className="absolute border-2 border-dashed border-brand-orange/60 rounded-3xl"
        style={{
          top: 'calc(var(--cvh) * 8)',
          bottom: 'calc(var(--cvh) * 8)',
          left: 'calc(var(--cvw) * 8)',
          right: 'calc(var(--cvw) * 8)',
        }}
      />

      {/* Edge labels */}
      <div className="absolute top-[calc(var(--cvh)*2)] w-full text-center">
        <span className="font-mono text-[calc(var(--cvw)*4)] text-brand-orange font-bold">TOP EDGE</span>
      </div>
      <div className="absolute bottom-[calc(var(--cvh)*2)] w-full text-center">
        <span className="font-mono text-[calc(var(--cvw)*4)] text-brand-orange font-bold">BOTTOM EDGE</span>
      </div>
      <div
        className="absolute left-[calc(var(--cvw)*2)] font-mono text-[calc(var(--cvw)*4)] text-brand-orange font-bold"
        style={{ writingMode: 'vertical-rl', top: '50%', transform: 'translateY(-50%)' }}
      >
        LEFT EDGE
      </div>
      <div
        className="absolute right-[calc(var(--cvw)*2)] font-mono text-[calc(var(--cvw)*4)] text-brand-orange font-bold"
        style={{ writingMode: 'vertical-rl', top: '50%', transform: 'translateY(-50%)' }}
      >
        RIGHT EDGE
      </div>

      {/* Center info */}
      <div className="z-10 flex flex-col items-center text-center px-[calc(var(--cvw)*8)]">
        <h1 className="font-display font-black text-[calc(var(--cvw)*12)] leading-none">1080×1920</h1>
        <p className="font-body text-[calc(var(--cvw)*6)] mt-[calc(var(--cvh)*2)] text-brand-teal">
          9:16 Reel Format
        </p>
        <p className="font-body text-[calc(var(--cvw)*5)] mt-[calc(var(--cvh)*2)] text-brand-muted max-w-[80%]">
          If this text is clipped, the safe-zone padding is wrong.
        </p>
        <div className="mt-[calc(var(--cvh)*4)] font-mono text-[calc(var(--cvw)*4)] text-brand-emerald">
          Safe zone: 8% margin on all sides
        </div>
      </div>
    </div>
  );
}
