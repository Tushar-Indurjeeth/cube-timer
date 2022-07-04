import React from 'react';
import { CubeTransparentIcon } from '@heroicons/react/solid';

import { getAuth, signOut } from 'firebase/auth';
const auth = getAuth();

export const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-[#212121] text-white">
      <div className="flex-1">
        <button
          onClick={() => signOut(auth)}
          className="btn btn-ghost normal-case text-xl"
        >
          Cube Timer
        </button>
        <CubeTransparentIcon className="w-8 h-8 text-red-600" />
      </div>
    </div>
  );
};
