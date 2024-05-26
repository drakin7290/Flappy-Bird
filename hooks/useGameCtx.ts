import { useRef } from 'react';
import { ParamsCtx, defaultParamsCtx } from '~/core/types';

const useGameCtx = (ctx: ParamsCtx | null) => {
  const params = useRef<ParamsCtx>(ctx || defaultParamsCtx);
  const cx: ParamsCtx = params.current;
  function setCtx({ name, value }) {
    params.current[name] = value;
  }
  return { ctx: cx, setCtx };
};

export default useGameCtx;
