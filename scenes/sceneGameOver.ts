import { KaboomCtx } from 'kaboom';
import { ParamsCtx, SceneType, SetParamsCtx } from '~/core/types';

const sceneGameOver = (kb: KaboomCtx, ctx: ParamsCtx, setParams: SetParamsCtx) => {
  if (kb) {
    kb.scene(SceneType.GAMEOVER, (scoreGame) => {
      if (scoreGame > ctx.highScore) {
        setParams({ name: 'highScore', value: scoreGame });
      }

      add([text('gameover!\n' + 'score: ' + scoreGame + '\nhigh score: ' + ctx.highScore, { size: 45 })]);

      onKeyPress('space', () => {
        setParams({ name: 'score', value: 0 });
        go('game');
      });

      onMousePress(() => {
        setParams({ name: 'score', value: 0 });
        go('game');
      });
    });
  }
};

export default sceneGameOver;
