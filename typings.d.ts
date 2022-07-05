import { FieldValue } from 'firebase/firestore';

export interface Score {
  scramble: string;
  time: number;
}

export interface Solve {
  scramble: string;
  time: number;
  timestamp: FieldValue;
}

export interface FirebaseRecord {
  id: string;
  scramble: string;
  time: number;
  timestamp: number;
}

export interface CovertedTime {
  centiSeconds: string;
  seconds: string;
  minutes: string;
}
