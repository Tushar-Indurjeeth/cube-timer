import React, { useEffect, useState } from 'react';
import { Score, Solve } from '../typings';

import { scramble } from '../utils/scramble';
import Hotkeys from 'react-hot-keys';
import { useRouter } from 'next/router';
import { auth, db } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  DocumentReference,
  serverTimestamp,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BanIcon } from '@heroicons/react/solid';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';
import NextNProgress from 'nextjs-progressbar';
import { convertTime } from '../utils/convertTime';

export const Stopwatch: React.FC = () => {
  const [timerOn, setTimerOn] = useState<boolean>(false);
  const [timerStart, setTimerStart] = useState<number>(0);
  const [timerTime, setTimerTime] = useState<number>(0);

  const [minutes, setMinutes] = useState<string>('00');
  const [seconds, setSeconds] = useState<string>('00');
  const [centiseconds, setCentiseconds] = useState<string>('00');

  const [scrambleMoves, setScrambleMoves] = useState<string>(scramble());
  const [keyDown, setKeyDown] = useState<boolean>(false);

  const [docRef, setDocRef] = useState<DocumentReference | null>(null);
  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  let userId: string;

  const MySwal = withReactContent(Swal);

  const swalFire = () =>
    MySwal.fire({
      title: 'Are you sure you want to delete your score?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, user?.email as string, docRef?.id as string));
        setDocRef(null);
        Swal.fire('Deleted!', 'Your score has been deleted.', 'success');
      }
    });

  useEffect(() => {
    let interval: any = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTimerTime(Date.now() - timerStart);

        const { centiSeconds, seconds, minutes } = convertTime(timerTime);

        setCentiseconds(centiSeconds);
        setSeconds(seconds);
        setMinutes(minutes);
      }, 10);
    } else if (!timerOn && centiseconds !== '00') {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [centiseconds, timerOn, timerStart, timerTime]);

  if (loading) {
    return <NextNProgress color="#DC2626" />;
  } else {
    userId = user?.email?.substring(0, user?.email?.indexOf('@')) as string;
  }

  const resetTimerText = () => {
    setMinutes('00');
    setSeconds('00');
    setCentiseconds('00');
  };

  const startTimer = () => {
    setTimerOn(true);
    setTimerTime(0);
    setTimerStart(Date.now() - timerTime);
  };

  const stopTimer = () => {
    setTimerOn(false);
  };

  const resetTimer = () => {
    setTimerStart(0);
    setTimerTime(0);
  };

  const uploadScore = async ({ scramble, time }: Score) => {
    const record: Solve = {
      scramble: scramble,
      time: time,
      timestamp: serverTimestamp(),
    };

    setDocRef(null);

    const docRef = await addDoc(collection(db, userId), record);

    setDocRef(docRef);
  };

  const deleteScoreHandler = async () => {
    if (docRef) {
      swalFire();
    }
  };

  // keyName: string, e: KeyboardEvent, handle: any
  const onKeyUp = () => {
    if (!timerOn && timerTime === 0) {
      setKeyDown(false);
      startTimer();
    } else if (timerOn && timerTime > 0) {
      stopTimer();
      uploadScore({ scramble: scrambleMoves, time: timerTime });
      resetTimer();
      setScrambleMoves(scramble());
    }
  };

  const onKeyDown = () => {
    if (!timerOn) {
      setKeyDown(true);
      resetTimerText();
    }
  };

  return (
    <Hotkeys keyName="space" onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
      <div className={`h-full flex flex-col text-center `}>
        <div
          className={`py-5 text-5xl text-gray-100 tracking-widest ${
            timerOn && 'hidden'
          }`}
        >
          {scrambleMoves}
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <div
            className={`text-8xl text-gray-100 mb-20 ${
              keyDown &&
              'transition duration-200 ease-in transform sm:scale-125 hover:z-50'
            }`}
          >
            {`${minutes} : ${seconds} : ${centiseconds}`}
          </div>

          <div
            className={`${docRef != null && 'flex space-x-2 w-1/2 m-auto'} ${
              timerOn && 'hidden'
            }`}
          >
            <button
              onClick={() => router.push(userId)}
              className={`text-2xl text-gray-300 `}
            >
              View Your Stats
            </button>
            <button
              hidden={docRef === null}
              onClick={() => deleteScoreHandler()}
            >
              <BanIcon className="w-11 h-11" />
            </button>
          </div>
        </div>
      </div>
    </Hotkeys>
  );
};
