/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps } from 'next';
import React from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../firebase';
import NextNProgress from 'nextjs-progressbar';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { convertTime } from '../utils/convertTime';
import { useRouter } from 'next/router';
import { Navbar } from '../components/Navbar';
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid';
import { CovertedTime, FirebaseRecord } from '../typings';

interface Props {
  scores: string;
}

const Scores = ({ scores }: Props) => {
  const [user, loading] = useAuthState(auth);
  const solves: FirebaseRecord[] = [];
  let avgTime = 0;
  const defaultTime: CovertedTime = {
    centiSeconds: '00',
    seconds: '00',
    minutes: '00',
  };
  let fastestTime: CovertedTime = defaultTime;
  let slowestTime: CovertedTime = defaultTime;
  let averageTime: CovertedTime = defaultTime;
  const router = useRouter();

  if (!user || loading || !scores) {
    return <NextNProgress color="#DC2626" />;
  } else {
    JSON.parse(scores).map((score: FirebaseRecord) => solves.push(score));
    solves?.map((solve: any) => (avgTime += solve.time));
  }

  try {
    fastestTime = convertTime(solves[0].time);
    slowestTime = convertTime(solves[solves.length - 1].time);
    averageTime = convertTime(avgTime / solves.length);
  } catch (err) {
    router.push('/');
  }

  return (
    <div className="bg-neutral-800">
      <Navbar />
      <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col text-2xl text-[#f8f8ff] space-y-5">
          <h1 className="text-3xl">Stats:</h1>

          {fastestTime?.minutes === '00' ? (
            <span>
              {`Best: ${fastestTime.seconds} : ${fastestTime.centiSeconds}`}
            </span>
          ) : (
            <span>
              {`Best: ${fastestTime?.minutes} : ${fastestTime?.seconds} : ${fastestTime?.centiSeconds}`}
            </span>
          )}

          {slowestTime?.minutes === '00' ? (
            <span>
              {`Worst: ${slowestTime.seconds} : ${slowestTime.centiSeconds}`}
            </span>
          ) : (
            <span>
              {`Worst: ${slowestTime?.minutes} : ${slowestTime?.seconds} : ${slowestTime?.centiSeconds}`}
            </span>
          )}

          {averageTime?.minutes === '00' ? (
            <span>
              {`Average: ${averageTime.seconds} : ${averageTime.centiSeconds}`}
            </span>
          ) : (
            <span>
              {`Average: ${averageTime?.minutes} : ${averageTime?.seconds} : ${averageTime?.centiSeconds}`}
            </span>
          )}

          <span>{`Count: ${solves?.length}`}</span>
          <button onClick={() => router.push('/')} className="w-1/2 m-auto">
            <ChevronDoubleLeftIcon className="w-14 h-14" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const q = query(collection(db, context?.query.id as string), orderBy('time'));

  const querySnapshot = await getDocs(q);

  const solves: FirebaseRecord[] = querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((solves: any) => ({
      ...solves,
      timestamp: solves.timestamp.toDate().getTime(),
    }));

  return {
    props: {
      scores: JSON.stringify(solves),
    },
  };
};

export default Scores;
