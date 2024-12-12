import { useNotesStore } from '@/app/store';
import React from 'react';
import { MoreOptions } from '@/app/notes/components';
import { Popovers } from '@/app/components';

export const NoteList: React.FC = () => {
  const { notes } = useNotesStore();

  return (
    <>
      {notes.data.map((note) => {
        return (
          <div key={note.id} className="rounded-md shadow-md flex items-center gap-2 pr-2 w-full">
            <div className="font-medium flex-1 pl-2 flex gap-2 items-center truncate min-h-[60px]">
              <Popovers content={note.title}>
                <div className="flex-1 truncate">{note.title}</div>
              </Popovers>
            </div>
            <MoreOptions note={note} />
          </div>
        );
      })}
    </>
  );
};
