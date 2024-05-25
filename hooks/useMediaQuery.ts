import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  function callback(event: any) {
    setMatches(event?.matches);
  }

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList?.addEventListener('change', callback);
    setMatches(mediaQueryList.matches);

    return () => {
      mediaQueryList?.removeEventListener('change', callback);
    };
  }, [query]);

  return matches;
};

//write demo use useMediaQuery
// import { useMediaQuery } from '~/hooks';
// const size = useMediaQuery('(min-width: 600px)');
// console.log(size);
// if (size) {
//   console.log('size > 600px');
// } else {
//   console.log('size < 600px');
// }

// import { useMemo } from 'react';
// import { useSubscription } from 'use-subscription';

// // import { canUseDOM } from '~/utils';

// export const useMediaQuery = (query) => {
//   const mediaQueryList = useMemo(() => window.matchMedia(query), [query]);

//   const subscription = useMemo(
//     () => ({
//       getCurrentValue: () => mediaQueryList?.matches ?? false,
//       subscribe: (callback) => {
//         mediaQueryList?.addEventListener('change', callback);
//         return () => mediaQueryList?.removeEventListener('change', callback);
//       },
//     }),
//     [mediaQueryList]
//   );

//   const matches = useSubscription(subscription);
//   return matches;
// };
