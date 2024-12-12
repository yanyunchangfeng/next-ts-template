import React from 'react';
import { Loading } from '@/app/components';
import { useNotesStore } from '@/app/store';
import { NoteList, NoteDrawer } from '@/app/notes/components';
import { Note } from '@/app/shared';

export const Notes: React.FC = () => {
  const { pending, fetchNotes, setEditIsOpen, updateNote, editIsOpen, openNote } = useNotesStore();
  const handleUpdateNote = (note: Note) => {
    setEditIsOpen(false);
    updateNote(note);
  };
  React.useEffect(() => {
    fetchNotes();
  }, []);

  return React.useMemo(() => {
    if (pending) {
      return <Loading />;
    }
    return (
      <>
        <NoteList />
        <NoteDrawer onOk={handleUpdateNote} open={editIsOpen} data={openNote} onCancel={() => setEditIsOpen(false)} />
      </>
    );
  }, [pending, editIsOpen, openNote]);
};
