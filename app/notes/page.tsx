'use client';

import React from 'react';

import { DelelteNote, Notes } from '@/app/notes/components';

const NotePage: React.FC = () => {
  return (
    <>
      <Notes />
      <DelelteNote />
    </>
  );
};

export default NotePage;
