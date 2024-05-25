import '~/public/styles/globals.scss';
import queryClient from '~/core/queryClient';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Progress } from '~/components/base/progress';
import { useProgressStore } from '~/store';
import ModalProvider from '../context/ModalContext/ModalProvider';
import GlobalProvider from '../context/GlobalContext/GlobalProvider';
import { QueryClientProvider } from '@tanstack/react-query';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const setIsAnimating = useProgressStore((state) => {
    if (state) {
      return state.setIsAnimating;
    }
  });
  const isAnimating = useProgressStore((state) => {
    if (state) {
      return state.isAnimating;
    }
  });
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Progress isAnimating={isAnimating} />
        <GlobalProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </GlobalProvider>
        <ToastContainer />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
