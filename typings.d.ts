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
