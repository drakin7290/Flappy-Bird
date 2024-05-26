import { KaboomCtx } from 'kaboom';
import { ParamsCtx, SceneType, SetParamsCtx } from '~/core/types';

const sceneIntro = (kb: KaboomCtx, ctx: ParamsCtx, setParams: SetParamsCtx) => {
  if (kb) {
    scene(SceneType.INTRO, () => {
      add([text('Press to start', { size: 50 })]);
      onKeyPress('space', () => {
        go('game');
      });
      onMousePress(() => {
        go('game');
      });
    });
  }
};

export default sceneIntro;
