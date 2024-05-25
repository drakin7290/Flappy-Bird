import { useEffect, useRef } from 'react';
import MainLayout from '~/layout/MainLayout';
import kaboom, { KaboomCtx } from 'kaboom';
import { GetStaticProps } from 'next';
import useStoreGlobal from '~/store/useStoreGlobal';

const PIPE_GAP = 240;
const GRAVITY = 1200;
const FLOOR_HEIGHT = 65;

export default function HomePage() {
  const score = useRef(0);
  const highScore = useRef(0);

  const { kb } = useStoreGlobal();

  useEffect(() => {
    function producePipes(kb: KaboomCtx) {
      const offset = rand(-50, 50);
      kb.add([
        sprite('pipe'),
        pos(width(), height() / 2 + offset + PIPE_GAP / 2),
        'pipe',
        area(),
        { passed: false },
      ]).height = height() / 2 + offset + PIPE_GAP / 2;

      kb.add([
        sprite('pipe', { flipY: true }),
        pos(width(), height() / 2 + offset - PIPE_GAP / 2),
        anchor('botleft'),
        'pipe',
        area(),
      ]).height = height() / 2 + offset - PIPE_GAP / 2;
    }
    if (kb) {
      // define gravity
      kb.setGravity(GRAVITY);

      loadSprite('birdy', '/sprites/blue-bird.png', {
        sliceX: 3,
        sliceY: 1,
        anims: {
          fly: { from: 0, to: 2 },
          idle: { from: 0, to: 0 },
        },
      });
      loadSprite('bg', '/sprites/bg.png');
      loadSprite('base', '/sprites/base.png');
      loadSprite('pipe', '/sprites/pipe.png');
      loadSound('swoosh', 'sounds/swoosh.wav');
      loadSound('point', 'sounds/point.wav');
      loadSound('hit', 'sounds/hit.wav');

      // add character to screen, from a list of components

      scene('intro', () => {
        add([text('press space to start', { size: 50 })]);
        onKeyPress('space', () => {
          go('game');
        });
      });

      scene('game', () => {
        add([sprite('bg', { width: width(), height: height() })]);

        const base = add([
          sprite('base', { width: width(), height: FLOOR_HEIGHT }),
          pos(0, height()),
          anchor('botleft'),
          area(),
          body({ isStatic: true }),
          z(10),
        ]);
        const base2 = add([
          sprite('base', { width: width(), height: FLOOR_HEIGHT }),
          pos(width(), height()),
          anchor('botleft'),
          area(),
          body({ isStatic: true }),
          z(10),
        ]);
        const player = add([sprite('birdy'), pos(40, 40), scale(2), area(), body(), rotate(0), anchor('center')]);

        player.height = 24;
        player.width = 34;

        player.play('fly', {
          loop: true,
        });

        const scoreText = add([text(score.current.toString(), { size: 50 }), z(100), pos(width() / 2, 50)]);

        function playerPlay() {
          play('swoosh');
          player.jump(400);
        }

        onKeyPress('space', () => {
          playerPlay();
        });

        onMousePress(() => {
          playerPlay();
        });

        onUpdate('pipe', (pipe) => {
          pipe.move(-160, 0);
          if (pipe.passed === false && pipe.pos.x < player.pos.x) {
            pipe.passed = true;
            score.current += 1;
            play('point');
            scoreText.text = score.current.toString();
          }
        });

        loop(1.5, () => {
          producePipes(kb);
        });

        player.onGround(() => {
          play('hit');
          go('gameover', score.current);
        });

        player.onUpdate(() => {
          if (player.isJumping()) {
            player.angle = -30;
          } else {
            if (player.angle < 90) {
              player.angle += 2;
            }
          }
        });

        player.onCollide('pipe', () => {
          play('hit');
          go('gameover', score.current);
        });

        base.onUpdate(() => {
          base.move(-160, 0);
          if (base.pos.x <= -width()) {
            base.pos.x = 0;
          }
        });
        base2.onUpdate(() => {
          base2.move(-160, 0);
          if (base2.pos.x <= 0) {
            base2.pos.x = width();
          }
        });
      });

      scene('gameover', (scoreGame) => {
        if (scoreGame > highScore.current) {
          highScore.current = scoreGame;
        }

        add([text('gameover!\n' + 'score: ' + scoreGame + '\nhigh score: ' + highScore.current, { size: 45 })]);

        onKeyPress('space', () => {
          score.current = 0;
          go('game');
        });
      });

      go('intro');
    }
  }, [kb]);
  return <MainLayout />;
}

export const getStaticProps: GetStaticProps = async (_context) => {
  return {
    props: {},
  };
};
