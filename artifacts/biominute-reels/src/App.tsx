import { useEffect, useMemo, useState } from 'react';
import VideoWithControls from '@/components/video/VideoWithControls';
import { TestScene } from '@/components/video/TestScene';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from '@/lib/video/config';

const FRAME_WIDTH = (VIDEO_HEIGHT * 16) / 9; // 16:9 frame that fits a 9:16 vertical canvas at full height
const BASE_STYLE = {
  ['--cvw' as string]: `${VIDEO_WIDTH / 100}px`,
  ['--cvh' as string]: `${VIDEO_HEIGHT / 100}px`,
  ['--video-scale' as string]: `min(100vw / ${VIDEO_WIDTH}, 100vh / ${VIDEO_HEIGHT})`,
};

function SafeFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const frameHeight = Math.min(window.innerHeight, (window.innerWidth * 9) / 16);
      setScale(frameHeight / VIDEO_HEIGHT);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#0B1120] flex items-center justify-center overflow-hidden">
      <div
        className="relative bg-[#0F172A] overflow-hidden shadow-2xl"
        style={{
          width: FRAME_WIDTH,
          height: VIDEO_HEIGHT,
          transform: `scale(${scale})`,
          borderRadius: 16,
        }}
      >
        {/* Decorative arcs on the wide 16:9 background */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-15"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle cx="0" cy="0" r="35" fill="none" stroke="#14b8a6" strokeWidth="0.4" />
          <circle cx="0" cy="0" r="48" fill="none" stroke="#2F6FED" strokeWidth="0.3" />
          <circle cx="0" cy="0" r="62" fill="none" stroke="#14b8a6" strokeWidth="0.2" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-full h-full pointer-events-none opacity-15"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle cx="100" cy="100" r="35" fill="none" stroke="#14b8a6" strokeWidth="0.4" />
          <circle cx="100" cy="100" r="48" fill="none" stroke="#2F6FED" strokeWidth="0.3" />
        </svg>

        {/* 9:16 safe area — the only part that ends up in the final exported video */}
        <div
          className="absolute left-1/2 top-1/2 border-2 border-brand-teal/80 box-border"
          style={{
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const isTest =
    typeof window !== 'undefined' && window.location.pathname.endsWith('/test');
  const isExport =
    typeof window !== 'undefined' && window.location.search.includes('export');

  const content = isTest ? <TestScene /> : <VideoWithControls />;

  if (isExport) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden" style={BASE_STYLE}>
        <div
          className="relative origin-center"
          style={{
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
            transform: 'scale(var(--video-scale))',
          }}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div style={BASE_STYLE}>
      <SafeFrame>{content}</SafeFrame>
    </div>
  );
}
