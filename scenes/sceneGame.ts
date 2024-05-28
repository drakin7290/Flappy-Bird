import { KaboomCtx } from 'kaboom';
import { FLOOR_HEIGHT, PIPE_GAP } from '~/core/constant';
import { ParamsCtx, SceneType, SetParamsCtx } from '~/core/types';

const sceneGame = (kb: KaboomCtx, ctx: ParamsCtx, setCtx: SetParamsCtx) => {
  function producePipes(kb: KaboomCtx) {
    let offset = rand(-150, 150);
    if (ctx.score > 20) {
      offset = rand(-500, 500);
    }
    kb.add([
      sprite('pipe'),
      pos(width(), height() / 2 + offset + PIPE_GAP / 2),
      'pipe',
      area(),
      scale(1.5),
      { passed: false },
    ]);

    kb.add([
      sprite('pipe', { flipY: true }),
      pos(width(), height() / 2 + offset - PIPE_GAP / 2),
      anchor('botleft'),
      'pipe',
      area(),
      scale(1.5),
    ]);
  }
  if (kb) {
    scene(SceneType.GAME, () => {
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
      const player = add([
        sprite('birdy'),
        pos(60, 120),
        scale(2),
        area({
          offset: new Vec2(10, 0),
          scale: new Vec2(0.6, 1),
        }),
        body(),
        rotate(0),
        anchor('center'),
      ]);

      player.height = 32.5;
      player.width = 34;

      player.play('fly', {
        loop: true,
      });

      const scoreText = add([text(ctx.score.toString(), { size: 50 }), z(100), pos(width() / 2, 50)]);

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
          setCtx({ name: 'score', value: ctx.score + 1 });
          play('point');
          scoreText.text = ctx.score.toString();
        }
      });

      loop(1.5, () => {
        producePipes(kb);
      });

      player.onGround(() => {
        play('hit');
        go('gameover', ctx.score);
      });

      player.onUpdate(() => {
        if (player.pos.y <= 0) {
          play('hit');
          go('gameover', ctx.score);
        }
        if (player.isJumping()) {
          player.angle = -30;
        } else {
          if (player.angle < 60) {
            player.angle += 2;
          }
        }
      });

      player.onCollide('pipe', () => {
        play('hit');
        go('gameover', ctx.score);
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
  }
};

export default sceneGame;
