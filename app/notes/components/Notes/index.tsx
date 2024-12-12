import React from 'react';
import { Loading } from '@/app/components';
import { useNotesStore } from '@/app/store';
import { NoteList, NoteDrawer } from '@/app/notes/components';
import { Note } from '@/app/shared';

export const Notes: React.FC = () => {
  const { pending, fetchNotes, setEditIsOpen, updateNote, editIsOpen, openNote } = useNotesStore();
  const handleUpdateNote = async (note: Note) => {
    setEditIsOpen(false);
    await updateNote(note);
  };
  const handleCancel = async () => {
    setEditIsOpen(false);
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
        <NoteDrawer onOk={handleUpdateNote} open={editIsOpen} data={openNote} onCancel={handleCancel} />
      </>
    );
  }, [pending, editIsOpen, openNote]);
};
