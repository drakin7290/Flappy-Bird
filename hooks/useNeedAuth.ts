import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { config } from '~/middleware';

const useNeedAuth = () => {
  const { asPath } = useRouter();
  const list = config.matcher;
  const [state, setState] = useState(false);
  useEffect(() => {
    if (asPath) {
      // let pn = pathname.slice(0, pathname.length - 1)
      list.forEach((item, index) => {
        if (item && item.includes('/:path*')) {
          const urlSplit = item.split('/:path*')[0];
          if (asPath.includes(urlSplit) && asPath != urlSplit) {
            setState(true);
            return;
          }
        } else {
          if (asPath === item || asPath === item + '/') {
            setState(true);
            return;
          }
        }
      });
    }
  }, [asPath]);
  return state;
};

export default useNeedAuth;
