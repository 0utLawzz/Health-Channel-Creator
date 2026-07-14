import { useEffect, useState } from 'react';
import VideoWithControls from '@/components/video/VideoWithControls';
import { TestScene } from '@/components/video/TestScene';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from '@/lib/video/config';

const BASE_STYLE = {
  ['--cvw' as string]: `${VIDEO_WIDTH / 100}px`,
  ['--cvh' as string]: `${VIDEO_HEIGHT / 100}px`,
  ['--video-scale' as string]: `min(100vw / ${VIDEO_WIDTH}, 100vh / ${VIDEO_HEIGHT})`,
};

function VerticalFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const scaleByHeight = window.innerHeight / VIDEO_HEIGHT;
      const scaleByWidth = window.innerWidth / VIDEO_WIDTH;
      setScale(Math.min(scaleByHeight, scaleByWidth));
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
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          borderRadius: 16,
        }}
      >
        {children}
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
      <div
        className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden"
        style={BASE_STYLE}
      >
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
      <VerticalFrame>{content}</VerticalFrame>
    </div>
  );
}
