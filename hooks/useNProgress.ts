import { useRef, useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';

const useNProgress = (showAfterMs = 300) => {
  const timer = useRef(null);

  useEffect(() => {
    function routeChangeStart() {
      clearTimeout(timer.current);
      timer.current = setTimeout(NProgress.start, showAfterMs);
    }

    function routeChangeEnd() {
      clearTimeout(timer.current);
      NProgress.done();
    }

    NProgress.configure({
      minimum: 0.3,
      easing: 'ease',
      speed: 800,
      showSpinner: false,
    });

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, [showAfterMs, timer]);
};

export { useNProgress };
