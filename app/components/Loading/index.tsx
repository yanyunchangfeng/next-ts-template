import React, { FC, HTMLAttributes } from 'react';
import clsx from 'clsx';

export const Loading: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const classes = clsx('animate-spin rounded-full border-b-2 border-pink-900 h-48 w-48', className);
  return (
    <div className="flex justify-center items-center flex-1">
      <div className={classes}></div>
    </div>
  );
};
