'use client';

import { AlertNote, Notes, Paganition, NotesHeader } from '@/app/notes/components';

const NotePage: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 gap-2 w-full">
      <NotesHeader />
      <Notes />
      <Paganition />
      <AlertNote />
    </div>
  );
};

export default NotePage;
