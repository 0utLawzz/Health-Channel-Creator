import VideoWithControls from '@/components/video/VideoWithControls';
import { TestScene } from '@/components/video/TestScene';
import { VIDEO_WIDTH, VIDEO_HEIGHT } from '@/lib/video/config';

export default function App() {
  const isTest = typeof window !== 'undefined' && window.location.pathname.endsWith('/test');

  return (
    <div
      className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{
        // Replit's preview panel can be any size; we always render the video at
        // exactly 1080×1920 CSS pixels and scale it to fit so the internal layout
        // is never dependent on the viewport shape. Canvas-relative units (cvw/cvh)
        // are defined as 1% of the intended 1080×1920 frame, not the browser window.
        ['--video-scale' as string]: `min(100vw / ${VIDEO_WIDTH}, 100vh / ${VIDEO_HEIGHT})`,
        ['--cvw' as string]: `${VIDEO_WIDTH / 100}px`,
        ['--cvh' as string]: `${VIDEO_HEIGHT / 100}px`,
      }}
    >
      <div
        className="relative origin-center"
        style={{
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
          transform: 'scale(var(--video-scale))',
        }}
      >
        {isTest ? <TestScene /> : <VideoWithControls />}
      </div>
    </div>
  );
}
