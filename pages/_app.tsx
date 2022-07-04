/* eslint-disable react-hooks/exhaustive-deps */
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router.js';
import { useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import '../styles/globals.css';

import '@sweetalert2/theme-dark/dark.css';

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login');
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user]);

  if (loading) return <NextNProgress color="#DC2626" />;

  return (
    <>
      <NextNProgress color="#DC2626" />
      <Component {...pageProps} />
    </>
  );
}
