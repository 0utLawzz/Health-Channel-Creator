import { useEffect } from 'react';
import { useVideoPlayer } from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { Scene0 } from './video_scenes/Scene0';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';

export const SCENE_DURATIONS = {
  0: 5500,
  1: 6000,
  2: 5000,
  3: 7500,
  4: 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  0: Scene0,
  1: Scene1,
  2: Scene2,
  3: Scene3,
  4: Scene4,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-brand-navy)' }}
    >
      {/* Background persistent layer */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        animate={{
          scale: sceneIndex === 4 ? 1.05 : 1.2,
          y: sceneIndex * -20,
        }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/sunrise-bg.png`}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-navy/60 mix-blend-multiply" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4vw_4vw]" />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
