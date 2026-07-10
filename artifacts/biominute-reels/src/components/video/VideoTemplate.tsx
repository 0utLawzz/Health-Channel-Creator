import { useEffect, useMemo } from 'react';
import { AudioEngine } from '@/lib/audio/AudioEngine';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene0 } from './video_scenes/Scene0';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS = {
  0: 4500,
  1: 9000,
  2: 8000,
  3: 5500,
  4: 7500,
  5: 6000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  0: Scene0,
  1: Scene1,
  2: Scene2,
  3: Scene3,
  4: Scene4,
  5: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      top: `${(i * 5) % 200}%`,
      left: `${(i * 17) % 100}%`,
      size: `${(i % 3) + 1}px`,
      opacity: ((i % 5) + 2) / 10,
      glow: i % 7 === 0,
    }));
  }, []);

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-brand-navy)' }}
    >
      {/* Background persistent layer */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: sceneIndex >= 3 ? 1.1 : 1,
          rotate: sceneIndex * 2,
        }}
        transition={{ duration: 4, ease: 'easeOut' }}
      >
        {/* Moon to Sun gradient shift effect */}
        <motion.div
           className="absolute inset-0 opacity-30"
           animate={{
              background: sceneIndex >= 4 
                ? 'radial-gradient(circle at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%)' 
                : 'radial-gradient(circle at top right, rgba(47, 111, 237, 0.4) 0%, transparent 60%)' 
           }}
           transition={{ duration: 2 }}
        />
        <div className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] bg-brand-teal/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70vw] h-[70vw] bg-brand-blue/5 rounded-full blur-[100px]" />
      </motion.div>

      {/* Parallax stars */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              boxShadow: star.glow ? '0 0 4px 1px rgba(255,255,255,0.8)' : 'none',
            }}
          />
        ))}
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:4vw_4vw]" />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      {/* Audio layer: background music + scene-change SFX. Assets are generated per episode and placed in public/audio/. */}
      <AudioEngine
        currentSceneKey={currentSceneKey}
        muted={muted}
        volume={0.35}
        assets={{
          background: 'audio/background.mp3',
          sceneSfx: {
            '0': 'audio/swoosh.mp3',
            '1': 'audio/pop.mp3',
            '2': 'audio/swoosh.mp3',
            '3': 'audio/pop.mp3',
            '4': 'audio/swoosh.mp3',
            '5': 'audio/pop.mp3',
            default: 'audio/swoosh.mp3',
          },
        }}
      />
    </div>
  );
}
