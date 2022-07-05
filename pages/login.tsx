import type { NextPage } from 'next';
import React from 'react';

import { getAuth, signInWithPopup } from 'firebase/auth';
import { CubeTransparentIcon } from '@heroicons/react/solid';

import { provider } from '../firebase';
import Image from 'next/image';
import Head from 'next/head';

const Login: NextPage = () => {
  const auth = getAuth();

  const signInHandler = () => {
    signInWithPopup(auth, provider); //.catch((error) => {
    //   // console.error(error);
    //   return;
    // });
  };

  return (
    <div className="h-screen grid place-content-center content-evenly  bg-neutral-800">
      <Head>
        <title>Cube timer login</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <h1 className="grid content-center text-5xl text-[#f8f8ffb4]">
        Cube Timer
      </h1>
      <CubeTransparentIcon className="w-60 h-60 text-red-600 items-center justify-center" />

      <button
        className="bg-[#f8f8ffe7] text-sm sm:text-xl p-2 sm:p-4 items-center text-black self-center"
        onClick={() => signInHandler()}
      >
        <div className="flex flex-row text-center justify-center w-full space-x-5 items-center">
          <div className="w-7 h-7 self-center">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="google logo"
              objectFit="contain"
              layout="responsive"
              height={40}
              width={40}
            />
          </div>
          <div className="self-center">Sign in with Google </div>
        </div>
      </button>
    </div>
  );
};

export default Login;
