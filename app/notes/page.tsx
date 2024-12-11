'use client';

import { AlertNote, Notes, AddNote, SearchNote, Paganition } from '@/app/notes/components';

const NotePage: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 gap-2 w-full">
      <SearchNote />
      <AddNote />
      <Notes />
      <Paganition />
      <AlertNote />
    </div>
  );
};

export default NotePage;
