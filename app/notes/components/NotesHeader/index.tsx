import React from 'react';
import { SearchNote, AddNote } from '@/app/notes/components';

export const NotesHeader: React.FC = () => {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      <SearchNote />
      <AddNote />
    </div>
  );
};
