import React from 'react';
import { Loading } from '@/app/components';
import { useNotesStore } from '@/app/store';
import { NoteList } from '@/app/notes/components';

export const Notes: React.FC = () => {
  const { pending, fetchNotes } = useNotesStore();

  React.useEffect(() => {
    fetchNotes();
  }, []);

  return React.useMemo(() => {
    if (pending) {
      return <Loading />;
    }
    return <NoteList />;
  }, [pending]);
};
