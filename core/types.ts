export enum SceneType {
  INTRO = 'intro',
  GAME = 'game',
  GAMEOVER = 'gameover',
}

export type ParamsCtx = {
  score: number;
  highScore: number;
};

export const defaultParamsCtx: ParamsCtx = {
  score: 0,
  highScore: 0,
};

export type SetParamsCtx = ({ name, value }: { name: string; value: any }) => void;
