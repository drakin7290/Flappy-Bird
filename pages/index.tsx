import { useEffect, useRef } from 'react';
import MainLayout from '~/layout/MainLayout';
import { GetStaticProps } from 'next';
import useStoreGlobal from '~/store/useStoreGlobal';
import useGameCtx from '~/hooks/useGameCtx';
import { GRAVITY } from '~/core/constant';
import sceneGameOver from '~/scenes/sceneGameOver';
import sceneGame from '~/scenes/sceneGame';
import sceneIntro from '~/scenes/sceneIntro';
import { SceneType } from '~/core/types';
import 'kaboom/global';

export default function HomePage() {
  const { kb } = useStoreGlobal();
  const { ctx, setCtx } = useGameCtx(null);
  useEffect(() => {
    if (kb) {
      kb.setGravity(GRAVITY);

      loadSprite('birdy', '/sprites/panda.png', {
        sliceX: 4,
        sliceY: 1,
        anims: {
          fly: { from: 0, to: 3 },
          idle: { from: 0, to: 0 },
        },
      });

      loadSprite('bg', '/sprites/bg.png');
      loadSprite('base', '/sprites/base.png');
      loadSprite('pipe', '/sprites/pipe.png');
      loadSound('swoosh', 'sounds/swoosh.wav');
      loadSound('point', 'sounds/point.wav');
      loadSound('hit', 'sounds/hit.wav');

      sceneIntro(kb, ctx, setCtx);
      sceneGame(kb, ctx, setCtx);
      sceneGameOver(kb, ctx, setCtx);

      go(SceneType.INTRO);
    }
  }, [kb]);
  return <MainLayout />;
}

export const getStaticProps: GetStaticProps = async (_context) => {
  return {
    props: {},
  };
};
