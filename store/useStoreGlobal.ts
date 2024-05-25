import { create } from 'zustand';
import { KaboomCtx } from 'kaboom';

type StoreGlobalType = {
  kb: KaboomCtx | null;
};

const store = () => ({
  kb: null,
});

const useStoreGlobal = create<StoreGlobalType>(store);

export default useStoreGlobal;

export function setStoreGlobal<T extends keyof StoreGlobalType>(x: Pick<StoreGlobalType, T>) {
  useStoreGlobal.setState(x);
}
