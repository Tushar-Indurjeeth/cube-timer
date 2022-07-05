import type { NextPage } from 'next';
import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

import { Navbar } from '../components/Navbar';
import { Stopwatch } from '../components/Stopwatch';
import NextNProgress from 'nextjs-progressbar';

const Home: NextPage = () => {
  const [user, loading] = useAuthState(auth);

  if (!user || loading) return <NextNProgress color="#DC2626" />;

  return (
    <div>
      <Head>
        <title>Cube timer</title>
        <meta name="description" content="Rubiks cube scrambler and timer" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Navbar />
      <Stopwatch />
    </div>
  );
};

export default Home;
